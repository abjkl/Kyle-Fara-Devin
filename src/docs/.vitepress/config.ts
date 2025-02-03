import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SSR Deployment Guide',
  description: 'Automated SSR server deployment guide and documentation',
  lang: 'en-US',
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Config', link: '/guide/configuration' },
      { text: 'Troubleshooting', link: '/guide/troubleshooting' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        }
      ]
    }
  }
})
