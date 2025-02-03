# 配置指南

## 环境变量设置
在开始部署之前，您需要设置相应的环境变量。以下是每个云服务提供商所需的环境变量：

### Azure 环境变量
```bash
# Azure 配置
AZURE_SUBSCRIPTION_ID=你的订阅ID  # 在 Azure 门户 -> 订阅中查找
AZURE_TENANT_ID=你的租户ID      # 在 Azure Active Directory -> 属性中查找
```

### Google Cloud 环境变量
```bash
# Google Cloud 配置
GOOGLE_CLOUD_PROJECT=你的项目ID  # 在 Google Cloud 控制台首页可以看到
GOOGLE_APPLICATION_CREDENTIALS=凭证文件路径/credentials.json  # 下载的服务账户密钥文件路径
```

### Vultr 环境变量
```bash
# Vultr 配置
VULTR_API_KEY=你的API密钥  # 在 Vultr 控制面板 -> API 中生成
```

## 服务器配置说明
配置文件使用 TypeScript 格式，包含以下选项：

```typescript
interface ServerConfig {
  // 云服务提供商选择
  provider: 'azure' | 'gcloud' | 'vultr';
  
  // 服务器区域，例如：
  // Azure: eastus, westus
  // Google Cloud: us-central1, asia-east1
  // Vultr: sgp, nrt
  region: string;
  
  // 服务器规格
  // small: 2核4G，适合个人项目
  // medium: 4核8G，适合小型团队
  // large: 8核16G，适合企业应用
  size: 'small' | 'medium' | 'large';
  
  // SSH密钥（可选）
  // 如果不提供，系统会自动生成
  sshKey?: string;
}
```

## 配置文件示例
创建一个名为 `deploy-config.ts` 的文件：

```typescript
import { deploy } from 'ssr-deploy';

// Azure 配置示例
const azureConfig = {
  provider: 'azure',
  region: 'eastus',    // 美国东部
  size: 'small'        // 2核4G配置
};

// Google Cloud 配置示例
const gcloudConfig = {
  provider: 'gcloud',
  region: 'us-central1',  // 美国中部
  size: 'medium'          // 4核8G配置
};

// Vultr 配置示例
const vultrConfig = {
  provider: 'vultr',
  region: 'sgp',         // 新加坡
  size: 'large'          // 8核16G配置
};

// 选择其中一个配置进行部署
deploy(azureConfig);
```
