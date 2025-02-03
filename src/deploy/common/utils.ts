import { ServerConfig } from './types';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function validateConfig(config: ServerConfig): void {
  if (!config.provider || !config.region || !config.size) {
    throw new Error('Missing required configuration');
  }
}

export function getSizeSpecs(size: string): { cpu: number; memory: number } {
  switch (size) {
    case 'small':
      return { cpu: 2, memory: 2 };
    case 'medium':
      return { cpu: 4, memory: 8 };
    case 'large':
      return { cpu: 8, memory: 16 };
    default:
      throw new Error(`Invalid size: ${size}`);
  }
}

export async function waitForSSH(ip: string): Promise<boolean> {
  try {
    await execAsync(`nc -z -w5 ${ip} 22`);
    return true;
  } catch {
    return false;
  }
}

export async function setupSSR(ip: string): Promise<boolean> {
  try {
    const commands = [
      'apt-get update',
      'apt-get install -y python3-pip',
      'pip3 install shadowsocks',
      'systemctl start shadowsocks-server'
    ];
    
    for (const cmd of commands) {
      await execAsync(`ssh root@${ip} "${cmd}"`);
    }
    return true;
  } catch {
    return false;
  }
}

export function getProviderConfig(): Record<string, string> {
  return {
    AZURE_SUBSCRIPTION_ID: process.env.AZURE_SUBSCRIPTION_ID || '',
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID || '',
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || '',
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
    VULTR_API_KEY: process.env.VULTR_API_KEY || ''
  };
}
