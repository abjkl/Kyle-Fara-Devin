# 配置指南

## 环境变量
```bash
# Azure
AZURE_SUBSCRIPTION_ID=你的订阅ID
AZURE_TENANT_ID=你的租户ID

# Google Cloud
GOOGLE_CLOUD_PROJECT=你的项目ID
GOOGLE_APPLICATION_CREDENTIALS=凭证文件路径/credentials.json

# Vultr
VULTR_API_KEY=你的API密钥
```

## 服务器配置
```typescript
interface ServerConfig {
  provider: 'azure' | 'gcloud' | 'vultr';
  region: string;
  size: 'small' | 'medium' | 'large';
  sshKey?: string;
}
```

## 使用示例
```typescript
import { deploy } from 'ssr-deploy';

const config = {
  provider: 'azure',
  region: 'eastus',
  size: 'small'
};

deploy(config);
```
