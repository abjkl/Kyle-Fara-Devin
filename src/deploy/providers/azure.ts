import { ComputeManagementClient } from '@azure/arm-compute';
import { DefaultAzureCredential } from '@azure/identity';
import { AzureProvider, ServerConfig, DeploymentResult } from '../common/types';
import { waitForSSH, setupSSR, getProviderConfig, getSizeSpecs } from '../common/utils';

export class AzureDeployment implements AzureProvider {
  private client: ComputeManagementClient;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    const { AZURE_SUBSCRIPTION_ID } = getProviderConfig();
    const credentials = new DefaultAzureCredential();
    this.client = new ComputeManagementClient(credentials, AZURE_SUBSCRIPTION_ID);
  }

  async configure(): Promise<void> {
    const config = getProviderConfig();
    if (!config.AZURE_SUBSCRIPTION_ID || !config.AZURE_TENANT_ID) {
      throw new Error('Missing Azure credentials');
    }
  }

  async deploy(): Promise<DeploymentResult> {
    try {
      const vmName = `ssr-${Date.now()}`;
      const resourceGroup = 'ssr-resources';
      const specs = getSizeSpecs(this.config.size);

      await this.client.virtualMachines.beginCreateOrUpdate(
        resourceGroup,
        vmName,
        {
          location: this.config.region,
          hardwareProfile: {
            vmSize: `Standard_B${specs.cpu}s`
          },
          osProfile: {
            computerName: vmName,
            adminUsername: 'azureuser',
            linuxConfiguration: {
              ssh: {
                publicKeys: [{
                  path: '/home/azureuser/.ssh/authorized_keys',
                  keyData: this.config.sshKey
                }]
              }
            }
          },
          networkProfile: {
            networkInterfaces: []
          },
          storageProfile: {
            imageReference: {
              publisher: 'Canonical',
              offer: 'UbuntuServer',
              sku: '20.04-LTS',
              version: 'latest'
            }
          }
        }
      );

      const vm = await this.client.virtualMachines.get(resourceGroup, vmName);
      const ip = vm.publicIPAddress;

      if (!ip || !(await waitForSSH(ip))) {
        throw new Error('Failed to connect to VM');
      }

      if (!(await setupSSR(ip))) {
        throw new Error('Failed to setup SSR');
      }

      return { success: true, serverIp: ip };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async destroy(): Promise<void> {
    // Implementation for cleanup will be added later
  }
}
