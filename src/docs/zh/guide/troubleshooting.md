# 故障排除指南

本指南帮助您解决使用 SSR 服务器时可能遇到的常见问题。

## 快速诊断

在深入具体问题之前，请先进行以下快速检查：
1. 能否 ping 通服务器 IP？
2. 服务器是否正在运行？查看仪表板。
3. 您的凭证是否正确？
4. 是否已检查错误日志？

## 连接问题

### 无法连接到服务器

**症状：**
- 连接超时
- "服务器无响应"错误
- 无法建立连接

**解决方案：**
1. 验证服务器状态：
```bash
ssr-deploy status
```

2. 检查防火墙设置：
```bash
ssr-deploy security check-firewall
```

3. 验证端口设置：
```bash
ssr-deploy config show port
```

4. 测试服务器连通性：
```bash
ping 您的服务器IP
```

### 连接速度慢

**症状：**
- 高延迟
- 下载/上传速度慢
- 频繁断开连接

**解决方案：**
1. 测试当前速度：
```bash
ssr-deploy speed-test
```

2. 启用网络加速：
```bash
ssr-deploy optimize enable-bbr
```

3. 检查服务器负载：
```bash
ssr-deploy monitor status
```

4. 优化配置：
```bash
ssr-deploy optimize auto
```

## 部署问题

### 部署失败

**症状：**
- 部署过程意外停止
- 部署期间出现错误消息
- 服务器未创建

**解决方案：**
1. 检查云服务提供商状态：
```bash
ssr-deploy provider status
```

2. 验证凭证：
```bash
ssr-deploy auth verify
```

3. 查看错误日志：
```bash
ssr-deploy logs --deployment
```

### 配置错误

**症状：**
- 服务器启动但不工作
- 日志中有错误消息
- 出现意外行为

**解决方案：**
1. 验证配置：
```bash
ssr-deploy config validate
```

2. 重置为默认设置：
```bash
ssr-deploy config reset
```

3. 检查环境变量：
```bash
ssr-deploy env check
```

## 安全问题

### 认证失败

**症状：**
- 无法登录仪表板
- SSH 连接被拒绝
- 权限拒绝错误

**解决方案：**
1. 重置认证：
```bash
ssr-deploy auth reset
```

2. 验证 SSH 密钥：
```bash
ssr-deploy security check-ssh
```

3. 更新凭证：
```bash
ssr-deploy auth update
```

### 服务器被入侵

**症状：**
- 异常流量模式
- 未知进程运行
- 资源使用率高

**解决方案：**
1. 启用安全扫描：
```bash
ssr-deploy security scan
```

2. 阻止可疑 IP：
```bash
ssr-deploy security block-suspicious
```

3. 从备份恢复：
```bash
ssr-deploy backup restore
```

## 获取帮助

如果您仍然遇到问题：

1. 生成诊断报告：
```bash
ssr-deploy diagnostic-report
```

2. 加入我们的社区支持频道
3. 携带诊断报告联系我们的支持团队
