# Troubleshooting Guide

This guide helps you solve common issues you might encounter with your SSR server.

## Quick Diagnosis

Before diving into specific issues, try these quick checks:
1. Can you ping your server IP?
2. Is your server running? Check the dashboard.
3. Are your credentials correct?
4. Have you checked the error logs?

## Connection Issues

### Cannot Connect to Server

**Symptoms:**
- Connection timeout
- "Server not responding" error
- Cannot establish connection

**Solutions:**
1. Verify server status:
```bash
ssr-deploy status
```

2. Check firewall settings:
```bash
ssr-deploy security check-firewall
```

3. Verify port settings:
```bash
ssr-deploy config show port
```

4. Test server connectivity:
```bash
ping your-server-ip
```

### Slow Connection Speed

**Symptoms:**
- High latency
- Slow download/upload speeds
- Frequent disconnections

**Solutions:**
1. Test current speed:
```bash
ssr-deploy speed-test
```

2. Enable network acceleration:
```bash
ssr-deploy optimize enable-bbr
```

3. Check server load:
```bash
ssr-deploy monitor status
```

4. Optimize configuration:
```bash
ssr-deploy optimize auto
```

## Deployment Problems

### Failed Deployment

**Symptoms:**
- Deployment process stops unexpectedly
- Error messages during deployment
- Server not created

**Solutions:**
1. Check cloud provider status:
```bash
ssr-deploy provider status
```

2. Verify credentials:
```bash
ssr-deploy auth verify
```

3. Review error logs:
```bash
ssr-deploy logs --deployment
```

### Configuration Errors

**Symptoms:**
- Server starts but doesn't work
- Error messages in logs
- Unexpected behavior

**Solutions:**
1. Validate configuration:
```bash
ssr-deploy config validate
```

2. Reset to default settings:
```bash
ssr-deploy config reset
```

3. Check environment variables:
```bash
ssr-deploy env check
```

## Security Issues

### Authentication Failed

**Symptoms:**
- Cannot log in to dashboard
- SSH connection refused
- Permission denied errors

**Solutions:**
1. Reset authentication:
```bash
ssr-deploy auth reset
```

2. Verify SSH keys:
```bash
ssr-deploy security check-ssh
```

3. Update credentials:
```bash
ssr-deploy auth update
```

### Server Compromised

**Symptoms:**
- Unusual traffic patterns
- Unknown processes running
- High resource usage

**Solutions:**
1. Enable security scan:
```bash
ssr-deploy security scan
```

2. Block suspicious IPs:
```bash
ssr-deploy security block-suspicious
```

3. Restore from backup:
```bash
ssr-deploy backup restore
```

## Getting Help

If you're still experiencing issues:

1. Generate a diagnostic report:
```bash
ssr-deploy diagnostic-report
```

2. Join our community support channel
3. Contact our support team with your diagnostic report
