import { ServerConfig, DeploymentResult } from './types';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function waitForSSH(ip: string, maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await execAsync(`ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 root@${ip} "echo 'SSH connection successful'"`, { timeout: 5000 });
      return true;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  return false;
}

export function getSizeSpecs(size: string): { cpu: number; memory: number } {
  const specs = {
    small: { cpu: 1, memory: 1 },
    medium: { cpu: 2, memory: 2 },
    large: { cpu: 4, memory: 4 }
  };
  return specs[size] || specs.small;
};

export async function validateConfig(config: ServerConfig): Promise<boolean> {
  if (!config.provider || !config.region || !config.size) {
    throw new Error('Missing required configuration: provider, region, or size');
  }

  const validProviders = ['azure', 'gcloud', 'vultr'];
  if (!validProviders.includes(config.provider)) {
    throw new Error(`Invalid provider: ${config.provider}`);
  }

  const validSizes = ['small', 'medium', 'large'];
  if (!validSizes.includes(config.size)) {
    throw new Error(`Invalid size: ${config.size}`);
  }

  return true;
}

export async function setupSSR(ip: string): Promise<boolean> {
  try {
    const { stdout, stderr } = await execAsync(`ssh -o StrictHostKeyChecking=no root@${ip} "wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh"`);
    console.log('SSR setup output:', stdout);
    if (stderr) console.error('SSR setup errors:', stderr);

    console.log('Setting up network acceleration...');
    await execAsync(`ssh -o StrictHostKeyChecking=no root@${ip} "wget -N --no-check-certificate https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh && chmod +x tcp.sh && ./tcp.sh"`);

    return true;
  } catch (error) {
    console.error('Error setting up SSR:', error);
    return false;
  }
}

export function getProviderConfig(): Record<string, string> {
  return {
    AZURE_SUBSCRIPTION_ID: process.env.AZURE_SUBSCRIPTION_ID || '',
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID || '',
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID || '',
    AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET || '',
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || '',
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
    VULTR_API_KEY: process.env.VULTR_API_KEY || ''
  };
}
