export type ServerSize = 'small' | 'medium' | 'large';

export interface ServerConfig {
  provider: 'azure' | 'gcloud' | 'vultr';
  region: string;
  size: ServerSize;
  sshKey?: string;
}

export interface DeploymentResult {
  success: boolean;
  serverIp?: string;
  error?: string;
}

export interface CloudProvider {
  configure(): Promise<void>;
  deploy(): Promise<DeploymentResult>;
  destroy(): Promise<void>;
}

export interface AzureProvider extends CloudProvider {}
export interface GCloudProvider extends CloudProvider {}
export interface VultrProvider extends CloudProvider {}
