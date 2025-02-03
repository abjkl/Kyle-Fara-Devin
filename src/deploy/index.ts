import { AzureDeployment } from './providers/azure';
import { GCloudDeployment } from './providers/gcloud';
import { VultrDeployment } from './providers/vultr';
import { CloudProvider, ServerConfig } from './common/types';
import { validateConfig } from './common/utils';

export async function deploy(config: ServerConfig): Promise<void> {
  const provider = getProvider(config);
  await provider.configure();
  await provider.deploy();
}

function getProvider(config: ServerConfig): CloudProvider {
  switch (config.provider) {
    case 'azure':
      return new AzureDeployment();
    case 'gcloud':
      return new GCloudDeployment();
    case 'vultr':
      return new VultrDeployment();
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
