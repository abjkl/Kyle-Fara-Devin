import Compute from '@google-cloud/compute';
import { CloudProvider, ServerConfig, DeploymentResult } from '../common/types';
import { waitForSSH, setupSSR, getProviderConfig, getSizeSpecs } from '../common/utils';

export class GCloudDeployment implements CloudProvider {
  private compute: Compute;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.compute = new Compute();
  }

  async configure(): Promise<void> {
    const config = getProviderConfig();
    if (!config.GOOGLE_CLOUD_PROJECT || !config.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('Missing Google Cloud credentials');
    }
  }

  async deploy(): Promise<DeploymentResult> {
    try {
      const specs = getSizeSpecs(this.config.size);
      const vmName = `ssr-${Date.now()}`;
      
      const zone = this.compute.zone(this.config.region);
      const [vm] = await zone.createVM(vmName, {
        machineType: `e2-custom-${specs.cpu}-${specs.memory * 1024}`,
        os: 'ubuntu-20-04',
        http: true,
        https: true,
        metadata: {
          items: [{
            key: 'ssh-keys',
            value: `root:${this.config.sshKey}`
          }]
        }
      });

      await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for VM to initialize
      const [metadata] = await vm.getMetadata();
      const networkInterfaces = metadata.networkInterfaces || [];
      const accessConfigs = networkInterfaces[0]?.accessConfigs || [];
      const ip = accessConfigs[0]?.natIP;

      if (!ip || !(await waitForSSH(ip))) {
        throw new Error('Failed to connect to VM');
      }

      if (!(await setupSSR(ip))) {
        throw new Error('Failed to setup SSR');
      }

      return { success: true, serverIp: ip };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  }

  async destroy(): Promise<void> {
    // Implementation for cleanup will be added later
  }
}
