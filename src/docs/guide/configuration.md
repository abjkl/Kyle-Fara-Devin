# Configuration Guide

## Environment Variables
```bash
# Azure
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_TENANT_ID=your-tenant-id

# Google Cloud
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json

# Vultr
VULTR_API_KEY=your-api-key
```

## Server Configuration
```typescript
interface ServerConfig {
  provider: 'azure' | 'gcloud' | 'vultr';
  region: string;
  size: 'small' | 'medium' | 'large';
  sshKey?: string;
}
```

## Usage Example
```typescript
import { deploy } from 'ssr-deploy';

const config = {
  provider: 'azure',
  region: 'eastus',
  size: 'small'
};

deploy(config);
```
