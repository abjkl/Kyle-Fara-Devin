import { initialize } from '@vultr/vultr-node';
import { CloudProvider, ServerConfig, DeploymentResult } from '../common/types';
import { waitForSSH, setupSSR, getProviderConfig, getSizeSpecs } from '../common/utils';

export class VultrDeployment implements CloudProvider {
  private client: any;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    const { VULTR_API_KEY } = getProviderConfig();
    this.client = initialize({ apiKey: VULTR_API_KEY });
  }

  async configure(): Promise<void> {
    const config = getProviderConfig();
    if (!config.VULTR_API_KEY) {
      throw new Error('Missing Vultr API key');
    }
  }

  async deploy(): Promise<DeploymentResult> {
    try {
      const specs = getSizeSpecs(this.config.size);
      const vmName = `ssr-${Date.now()}`;
      
      const instance = await this.client.instance.create({
        region: this.config.region,
        plan: `vc2-${specs.cpu}c-${specs.memory}gb`,
        os_id: 387, // Ubuntu 20.04 x64
        label: vmName,
        sshkey_id: this.config.sshKey || undefined,
        enable_ipv6: true,
        backups: 'disabled'
      });

      const ip = instance.main_ip;

      if (!ip || !(await waitForSSH(ip))) {
        throw new Error('Failed to connect to VM');
      }

      const setupResult = await setupSSR(ip);
      if (!setupResult) {
        throw new Error('Failed to setup SSR');
      }

      return { success: true, serverIp: ip };
    } catch (error: unknown) {
      console.error('Vultr deployment failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  }

  async destroy(): Promise<void> {
    // Implementation for cleanup will be added later
  }
}
