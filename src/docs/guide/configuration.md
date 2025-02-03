# Configuration Guide

Learn how to configure and optimize your SSR server for the best performance and security.

## Basic Settings

### Server Location Selection
Choose a server location based on your target users:
- **Asia Pacific**
  - Singapore: Best for Southeast Asia
  - Japan: Optimal for East Asia
  - Korea: Alternative for East Asia
- **Europe**
  - Germany: Central European coverage
  - Netherlands: Good for Western Europe
- **Americas**
  - Los Angeles: Best for North America
  - New York: Alternative for East Coast

### Server Size Guide
Choose based on your needs:
- **Small (1 CPU, 1GB RAM)**
  - Personal use
  - Up to 10 concurrent users
  - Monthly cost: $5-10
- **Medium (2 CPU, 2GB RAM)**
  - Small team use
  - Up to 30 concurrent users
  - Monthly cost: $10-20
- **Large (4 CPU, 4GB RAM)**
  - Large team use
  - Up to 100 concurrent users
  - Monthly cost: $20-40

## Security Settings

### Port Configuration
```bash
# Change default port (recommended)
ssr-deploy config set port 8388

# Enable port randomization
ssr-deploy config set random-port true
```

### Firewall Setup
```bash
# Enable basic firewall
ssr-deploy security enable-firewall

# Allow specific IP ranges
ssr-deploy security allow-ip 192.168.1.0/24
```

### Encryption Settings
```bash
# Change encryption method
ssr-deploy config set method aes-256-gcm

# Enable perfect forward secrecy
ssr-deploy security enable-pfs
```

## Performance Optimization

### Network Acceleration
1. Enable BBR acceleration:
```bash
ssr-deploy optimize enable-bbr
```

2. Configure TCP fastopen:
```bash
ssr-deploy optimize enable-fastopen
```

### Traffic Management
```bash
# Set bandwidth limits (optional)
ssr-deploy config set speed-limit-per-user 10240 # 10MB/s

# Set connection limits
ssr-deploy config set max-connections 500
```

### Monitoring Setup
```bash
# Enable basic monitoring
ssr-deploy monitor enable

# Set up alerts (optional)
ssr-deploy monitor set-alert cpu 90 # Alert at 90% CPU
ssr-deploy monitor set-alert memory 85 # Alert at 85% memory
```

## Advanced Configuration

### Multi-User Setup
```bash
# Add a new user
ssr-deploy user add --name "team1" --limit 5120 # 5MB/s limit

# List all users
ssr-deploy user list
```

### Backup Configuration
```bash
# Enable automatic backups
ssr-deploy backup enable daily

# Manual backup
ssr-deploy backup create
```

### Load Balancing
For high-traffic scenarios:
```bash
# Enable load balancing
ssr-deploy cluster enable

# Add secondary server
ssr-deploy cluster add-node --ip 192.168.1.2
```
