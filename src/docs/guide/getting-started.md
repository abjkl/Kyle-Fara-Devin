# Getting Started

This guide will help you deploy your SSR server quickly and easily. Follow these simple steps to get started.

## Prerequisites

You'll need:
- A cloud provider account (we recommend Vultr for best value)
- SSH key pair for secure server access
- Node.js 16 or higher installed on your computer

## Step-by-Step Guide

### 1. Install the Deployment Tool

Open your terminal and run:
```bash
npm install -g ssr-deploy-tool
```

### 2. Set Up Cloud Provider Credentials

#### For Vultr (Recommended)
1. Go to [Vultr.com](https://www.vultr.com)
2. Create an account or sign in
3. Go to Account → API
4. Generate a new API key
5. Save your API key in a secure location

Run the configuration:
```bash
export VULTR_API_KEY='your-api-key-here'
ssr-deploy configure
```

#### For Google Cloud
1. Create a project in Google Cloud Console
2. Enable Compute Engine API
3. Create a service account and download the JSON key
4. Set the environment variables:
```bash
export GOOGLE_CLOUD_PROJECT='your-project-id'
export GOOGLE_APPLICATION_CREDENTIALS='path/to/service-account.json'
ssr-deploy configure
```

#### For Azure
1. Create an Azure account
2. Register an application in Azure Active Directory
3. Set the environment variables:
```bash
export AZURE_SUBSCRIPTION_ID='your-subscription-id'
export AZURE_TENANT_ID='your-tenant-id'
export AZURE_CLIENT_ID='your-client-id'
export AZURE_CLIENT_SECRET='your-client-secret'
ssr-deploy configure
```

### 3. Deploy Your Server

Deploy with default settings (recommended for beginners):
```bash
ssr-deploy start
```

Or specify custom settings:
```bash
ssr-deploy start --provider vultr --region sgp --size small
```

### 4. Access Your Server

After deployment completes, you'll receive:
- Server IP address
- Initial access credentials
- SSR client configuration

Save these details in a secure location - you'll need them to connect to your server.

## Next Steps

- [Configure your server settings](./configuration.md) for optimal performance
- [Check the troubleshooting guide](./troubleshooting.md) if you encounter any issues
- Join our community for support and tips
