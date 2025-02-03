import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'ssr-deployment-app-tunnel-00jbn8gb.devinapps.com',
      '.devinapps.com'
    ]
  }
})
