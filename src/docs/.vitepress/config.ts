import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SSR Deployment Guide',
  description: 'Automated SSR server deployment guide and documentation',
  lang: 'en-US',
  
  // Multi-language support
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

  // Theme configuration
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'SSR Deployment',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Config', link: '/guide/configuration' },
      { text: 'Troubleshooting', link: '/guide/troubleshooting' },
      { text: 'GitHub', link: 'https://github.com/abjkl/Kyle-Fara-Devin' }
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
      ],
      '/zh/guide/': [
        {
          text: '指南',
          items: [
            { text: '开始使用', link: '/zh/guide/getting-started' },
            { text: '配置', link: '/zh/guide/configuration' },
            { text: '故障排除', link: '/zh/guide/troubleshooting' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/abjkl/Kyle-Fara-Devin' }
    ]
  },

  // Head meta tags for SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Performance and UX optimizations
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',
  ignoreDeadLinks: true,

  // Build optimizations
  build: {
    minify: true,
    chunkSizeWarningLimit: 1000
  }
})
