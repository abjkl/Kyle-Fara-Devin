import { AzureDeployment } from '../providers/azure';
import { GCloudDeployment } from '../providers/gcloud';
import { VultrDeployment } from '../providers/vultr';
import { ServerConfig } from '../common/types';

// Mock cloud provider modules
const mockVirtualMachines = {
  beginCreateOrUpdate: jest.fn().mockResolvedValue({}),
  get: jest.fn().mockResolvedValue({})
};

const mockNetworkInterfaces = {
  list: jest.fn().mockResolvedValue({
    async *[Symbol.asyncIterator]() {
      yield {
        ipConfigurations: [{
          publicIPAddress: { id: 'test-ip-id' }
        }]
      };
    }
  })
};

const mockPublicIPAddresses = {
  get: jest.fn().mockResolvedValue({ ipAddress: '1.2.3.4' })
};

jest.mock('@azure/arm-compute', () => ({
  ComputeManagementClient: jest.fn().mockImplementation(() => ({
    virtualMachines: mockVirtualMachines
  }))
}));

jest.mock('@azure/arm-network', () => ({
  NetworkManagementClient: jest.fn().mockImplementation(() => ({
    networkInterfaces: mockNetworkInterfaces,
    publicIPAddresses: mockPublicIPAddresses
  }))
}));

jest.mock('@azure/identity', () => ({
  DefaultAzureCredential: jest.fn()
}));

jest.mock('@google-cloud/compute', () => {
  return jest.fn().mockImplementation(() => ({
    zone: jest.fn().mockReturnValue({
      createVM: jest.fn().mockResolvedValue([{
        getMetadata: jest.fn().mockResolvedValue([{
          networkInterfaces: [{
            accessConfigs: [{ natIP: '1.2.3.4' }]
          }]
        }])
      }])
    })
  }));
});

jest.mock('@vultr/vultr-node', () => {
  const Vultr = jest.fn().mockImplementation(() => ({
    instance: {
      create: jest.fn().mockResolvedValue({ main_ip: '1.2.3.4' })
    }
  }));
  return { default: Vultr };
});
jest.mock('../common/utils', () => ({
  waitForSSH: jest.fn().mockResolvedValue(true),
  setupSSR: jest.fn().mockResolvedValue(true),
  getProviderConfig: jest.fn().mockReturnValue({
    AZURE_SUBSCRIPTION_ID: 'test-sub',
    AZURE_TENANT_ID: 'test-tenant',
    GOOGLE_CLOUD_PROJECT: 'test-project',
    GOOGLE_APPLICATION_CREDENTIALS: 'test-creds',
    VULTR_API_KEY: 'test-key'
  }),
  getSizeSpecs: jest.fn().mockReturnValue({
    cpu: 1,
    memory: 1
  }),
  getProviderConfig: jest.fn().mockReturnValue({
    AZURE_SUBSCRIPTION_ID: 'test-sub',
    AZURE_TENANT_ID: 'test-tenant',
    GOOGLE_CLOUD_PROJECT: 'test-project',
    GOOGLE_APPLICATION_CREDENTIALS: 'test-creds',
    VULTR_API_KEY: 'test-key'
  })
}));

describe('Cloud Provider Deployments', () => {
  const testConfig: ServerConfig = {
    provider: 'azure',
    region: 'test-region',
    size: 'small',
    sshKey: 'test-key'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Azure Deployment', () => {
    it('should deploy successfully', async () => {
      const azure = new AzureDeployment(testConfig);
      const result = await azure.deploy();
      expect(result.success).toBe(true);
      expect(result.serverIp).toBeDefined();
    });

    it('should handle deployment failures', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const azure = new AzureDeployment(testConfig);
      jest.spyOn(azure as any, 'computeClient').mockImplementation(() => {
        throw new Error('Deployment failed');
      });
      const result = await azure.deploy();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Google Cloud Deployment', () => {
    const gcloudConfig = { ...testConfig, provider: 'gcloud' as const };

    it('should deploy successfully', async () => {
      const gcloud = new GCloudDeployment(gcloudConfig);
      const result = await gcloud.deploy();
      expect(result.success).toBe(true);
      expect(result.serverIp).toBeDefined();
    });

    it('should handle deployment failures', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const gcloud = new GCloudDeployment(gcloudConfig);
      jest.spyOn(gcloud as any, 'compute').mockImplementation(() => {
        throw new Error('Deployment failed');
      });
      const result = await gcloud.deploy();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Vultr Deployment', () => {
    const vultrConfig = { ...testConfig, provider: 'vultr' as const };

    it('should deploy successfully', async () => {
      const vultr = new VultrDeployment(vultrConfig);
      const result = await vultr.deploy();
      expect(result.success).toBe(true);
      expect(result.serverIp).toBeDefined();
    });

    it('should handle deployment failures', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const vultr = new VultrDeployment(vultrConfig);
      jest.spyOn(vultr as any, 'client').mockImplementation(() => {
        throw new Error('Deployment failed');
      });
      const result = await vultr.deploy();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
