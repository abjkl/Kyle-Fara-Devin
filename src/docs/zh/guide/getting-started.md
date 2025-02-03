# 开始使用

## 什么是 SSR？
SSR（服务器端渲染）是一种网页渲染技术，它可以：
- 提高网页加载速度
- 改善搜索引擎优化（SEO）
- 提供更好的用户体验

## 前提条件
- Node.js 16 或更高版本（如果未安装，请访问 [Node.js 官网](https://nodejs.org/)）
- 云服务提供商账户（可以选择以下任意一个）：
  - Azure：适合企业级应用
  - Google Cloud：提供全球化部署选项
  - Vultr：性价比高，适合个人项目
- 基本的命令行使用经验

## 安装步骤
1. 打开命令行终端
2. 运行以下命令安装部署工具：
```bash
npm install ssr-deploy-docs
```
3. 验证安装：
```bash
npx ssr-deploy-docs --version
```

## 快速开始
1. 配置云服务提供商凭证（详见下方说明）
2. 创建配置文件（参考配置指南）
3. 运行部署命令：
```bash
npx ssr-deploy-docs deploy
```

## 云服务提供商详细设置
### Azure
1. 创建 Azure 账户
   - 访问 [Azure 官网](https://azure.microsoft.com/)
   - 点击"免费账户"
   - 按照指引完成注册
2. 设置服务主体
   - 在 Azure 门户中打开"Azure Active Directory"
   - 创建新的应用注册
   - 记录应用程序（客户端）ID
3. 配置环境变量
   - 复制订阅 ID 和租户 ID
   - 设置到系统环境变量中

### Google Cloud
1. 创建 Google Cloud 账户
   - 访问 [Google Cloud 官网](https://cloud.google.com/)
   - 注册新账户（可获得免费试用额度）
2. 设置服务账户
   - 打开"IAM 和管理"
   - 创建服务账户
   - 分配必要权限
3. 下载凭证文件
   - 生成 JSON 格式的密钥文件
   - 安全保存在本地计算机上

### Vultr
1. 创建 Vultr 账户
   - 访问 [Vultr 官网](https://www.vultr.com/)
   - 完成注册流程
2. 生成 API 密钥
   - 登录控制面板
   - 在"API"选项中生成新密钥
3. 设置环境变量
   - 将 API 密钥添加到系统环境变量
   - 验证密钥权限
