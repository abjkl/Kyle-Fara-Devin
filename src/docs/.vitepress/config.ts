import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SSR Deployment Guide',
  description: 'Automated SSR Server Deployment Documentation',
  
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: '指南', link: '/zh/guide/getting-started' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ]
        }
      ],
      '/zh/guide/': [
        {
          text: '指南',
          items: [
            { text: '开始使用', link: '/zh/guide/getting-started' },
            { text: '配置说明', link: '/zh/guide/configuration' },
            { text: '故障排除', link: '/zh/guide/troubleshooting' },
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' }
        ]
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' }
        ]
      }
    }
  }
})
