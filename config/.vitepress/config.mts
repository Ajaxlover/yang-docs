import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '前端知识体系',
  description: '个人前端知识体系整理与分享',
  lang: 'zh-CN',
  base: '/yang-docs/',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'TypeScript', link: '/TypeScript常用' },
      { text: '前端工程化', link: '/前端工程化详细落地实践方案' },
      { text: 'CSS进阶', link: '/CSS进阶' },
      { text: 'Vue3', link: '/Vue3语法实践' },
    ],

    sidebar: [
      {
        text: 'TypeScript',
        items: [{ text: 'TypeScript常用', link: '/TypeScript常用' }],
      },
      {
        text: '前端工程化',
        items: [
          { text: '详细落地实践方案', link: '/前端工程化详细落地实践方案' },
          { text: '前端监控', link: '/前端监控系统实践' },
        ],
      },
      {
        text: 'CSS进阶',
        items: [{ text: 'CSS进阶指南', link: '/CSS进阶' }],
      },
      {
        text: 'Vue3',
        items: [{ text: 'Vue3语法实践', link: '/Vue3语法实践' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    // 页脚配置
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2023-present',
    },

    // 文档页面配置
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    // 最后更新时间文本
    lastUpdatedText: '最后更新',
  },
})
