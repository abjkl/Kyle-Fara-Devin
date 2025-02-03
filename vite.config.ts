import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'ssr-deployment-app-tunnel-wvmj9hte.devinapps.com',
      '.devinapps.com',
      'localhost'
    ]
  }
})
