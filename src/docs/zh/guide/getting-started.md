# 入门指南

本指南将帮助您快速轻松地部署 SSR 服务器。按照以下简单步骤开始使用。

## 准备工作

您需要：
- 云服务提供商账号（推荐使用 Vultr，性价比最高）
- SSH 密钥对，用于安全访问服务器
- 计算机上安装 Node.js 16 或更高版本

## 详细步骤

### 1. 安装部署工具

打开终端并运行：
```bash
npm install -g ssr-deploy-tool
```

### 2. 设置云服务提供商凭证

#### Vultr（推荐）
1. 访问 [Vultr.com](https://www.vultr.com)
2. 创建账号或登录
3. 进入 Account（账户）→ API
4. 生成新的 API 密钥
5. 将 API 密钥保存在安全的位置

运行配置：
```bash
export VULTR_API_KEY='您的-API-密钥'
ssr-deploy configure
```

#### Google Cloud
1. 在 Google Cloud Console 中创建项目
2. 启用 Compute Engine API
3. 创建服务账号并下载 JSON 密钥
4. 设置环境变量：
```bash
export GOOGLE_CLOUD_PROJECT='您的项目ID'
export GOOGLE_APPLICATION_CREDENTIALS='服务账号密钥文件路径'
ssr-deploy configure
```

#### Azure
1. 创建 Azure 账号
2. 在 Azure Active Directory 中注册应用程序
3. 设置环境变量：
```bash
export AZURE_SUBSCRIPTION_ID='您的订阅ID'
export AZURE_TENANT_ID='您的租户ID'
export AZURE_CLIENT_ID='您的客户端ID'
export AZURE_CLIENT_SECRET='您的客户端密钥'
ssr-deploy configure
```

### 3. 部署服务器

使用默认设置部署（推荐新手使用）：
```bash
ssr-deploy start
```

或指定自定义设置：
```bash
ssr-deploy start --provider vultr --region sgp --size small
```

### 4. 访问服务器

部署完成后，您将收到：
- 服务器 IP 地址
- 初始访问凭证
- SSR 客户端配置

请将这些信息保存在安全的位置 - 您需要它们来连接服务器。

## 下一步

- [配置服务器设置](./configuration.md)以获得最佳性能
- 遇到问题请查看[故障排除指南](./troubleshooting.md)
- 加入我们的社区获取支持和技巧
