export interface CloudProvider {
  deploy(): Promise<void>;
  configure(): Promise<void>;
  destroy(): Promise<void>;
}

export interface AzureProvider extends CloudProvider {
  // Azure-specific methods will be added in step 005
}

export interface ServerConfig {
  provider: 'azure' | 'gcloud' | 'vultr';
  region: string;
  size: 'small' | 'medium' | 'large';
  sshKey?: string;
}

export interface DeploymentResult {
  success: boolean;
  serverIp?: string;
  error?: string;
}
