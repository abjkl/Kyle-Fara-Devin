import { ComputeManagementClient } from '@azure/arm-compute';
import { NetworkManagementClient } from '@azure/arm-network';
import { DefaultAzureCredential } from '@azure/identity';
import { AzureProvider, ServerConfig, DeploymentResult } from '../common/types';
import { waitForSSH, setupSSR, getProviderConfig, getSizeSpecs } from '../common/utils';

export class AzureDeployment implements AzureProvider {
  private computeClient: ComputeManagementClient;
  private networkClient: NetworkManagementClient;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    const { AZURE_SUBSCRIPTION_ID } = getProviderConfig();
    const credentials = new DefaultAzureCredential();
    this.computeClient = new ComputeManagementClient(credentials, AZURE_SUBSCRIPTION_ID);
    this.networkClient = new NetworkManagementClient(credentials, AZURE_SUBSCRIPTION_ID);
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

      await this.computeClient.virtualMachines.beginCreateOrUpdate(
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
                  keyData: this.config.sshKey || ''
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

      const networkInterfaces = await this.networkClient.networkInterfaces.list(resourceGroup);
      const interfaces = [];
      for await (const ni of networkInterfaces) {
        interfaces.push(ni);
      }
      const publicIpId = interfaces[0]?.ipConfigurations?.[0]?.publicIPAddress?.id;
      
      if (!publicIpId) {
        throw new Error('Failed to get public IP address');
      }
      
      const publicIp = await this.networkClient.publicIPAddresses.get(resourceGroup, publicIpId.split('/').pop()!);
      const ip = publicIp.ipAddress;

      if (!ip || !(await waitForSSH(ip))) {
        throw new Error('Failed to connect to VM');
      }

      const setupResult = await setupSSR(ip);
      if (!setupResult) {
        throw new Error('Failed to setup SSR');
      }

      return { success: true, serverIp: ip };
    } catch (error: unknown) {
      console.error('Azure deployment failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  }

  async destroy(): Promise<void> {
    // Implementation for cleanup will be added later
  }
}
