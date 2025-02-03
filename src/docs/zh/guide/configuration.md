# 配置指南

了解如何配置和优化您的 SSR 服务器以获得最佳性能和安全性。

## 基本设置

### 服务器位置选择
根据目标用户选择服务器位置：
- **亚太地区**
  - 新加坡：最适合东南亚
  - 日本：最适合东亚
  - 韩国：东亚备选
- **欧洲**
  - 德国：覆盖中欧
  - 荷兰：适合西欧
- **美洲**
  - 洛杉矶：最适合北美
  - 纽约：东海岸备选

### 服务器规格指南
根据需求选择：
- **小型 (1核CPU，1GB内存)**
  - 个人使用
  - 最多10个并发用户
  - 月费：5-10美元
- **中型 (2核CPU，2GB内存)**
  - 小团队使用
  - 最多30个并发用户
  - 月费：10-20美元
- **大型 (4核CPU，4GB内存)**
  - 大团队使用
  - 最多100个并发用户
  - 月费：20-40美元

## 安全设置

### 端口配置
```bash
# 更改默认端口（推荐）
ssr-deploy config set port 8388

# 启用端口随机化
ssr-deploy config set random-port true
```

### 防火墙设置
```bash
# 启用基本防火墙
ssr-deploy security enable-firewall

# 允许特定IP范围
ssr-deploy security allow-ip 192.168.1.0/24
```

### 加密设置
```bash
# 更改加密方式
ssr-deploy config set method aes-256-gcm

# 启用完美前向保密
ssr-deploy security enable-pfs
```

## 性能优化

### 网络加速
1. 启用 BBR 加速：
```bash
ssr-deploy optimize enable-bbr
```

2. 配置 TCP fastopen：
```bash
ssr-deploy optimize enable-fastopen
```

### 流量管理
```bash
# 设置带宽限制（可选）
ssr-deploy config set speed-limit-per-user 10240 # 10MB/s

# 设置连接限制
ssr-deploy config set max-connections 500
```

### 监控设置
```bash
# 启用基本监控
ssr-deploy monitor enable

# 设置告警（可选）
ssr-deploy monitor set-alert cpu 90 # CPU使用率90%时告警
ssr-deploy monitor set-alert memory 85 # 内存使用率85%时告警
```

## 高级配置

### 多用户设置
```bash
# 添加新用户
ssr-deploy user add --name "team1" --limit 5120 # 限速5MB/s

# 列出所有用户
ssr-deploy user list
```

### 备份配置
```bash
# 启用自动备份
ssr-deploy backup enable daily

# 手动备份
ssr-deploy backup create
```

### 负载均衡
适用于高流量场景：
```bash
# 启用负载均衡
ssr-deploy cluster enable

# 添加从服务器
ssr-deploy cluster add-node --ip 192.168.1.2
```
