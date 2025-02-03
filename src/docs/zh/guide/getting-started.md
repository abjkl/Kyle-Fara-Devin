# 入门指南

本指南将帮助您在主要云服务提供商上轻松部署 SSR 服务器。

## 准备工作

- 云服务提供商账号（Azure、Google Cloud 或 Vultr）
- 准备好待部署的 SSR 应用程序代码
- 基本的服务器部署概念理解

## 快速开始

1. 安装部署工具：
```bash
npm install -g ssr-deploy-tool
```

2. 配置云服务提供商凭证：
```bash
ssr-deploy configure
```

3. 部署服务器：
```bash
ssr-deploy start
```

## 下一步

- [配置服务器设置](./configuration.md)
- 遇到问题请查看[故障排除指南](./troubleshooting.md)
