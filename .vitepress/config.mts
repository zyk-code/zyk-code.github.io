import { defineConfig } from 'vitepress'
import { auto } from './ulits/auto.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zyk",
  description: "文档站点",
  // base: "/",

  // 导航栏图标
  head: [["link", { rel: "icon", href: "/assets/logo.svg" }]],

  themeConfig: {

    outlineTitle: "文章目录",
    outline: [2, 6],

    // sidebar: [
    //   {
    //     text: '实例',
    //     items: [
    //       { text: 'Markdown Examples', link: '/test/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/test/api-examples' }
    //     ]
    //   }
    // ],
    // 不配置等同于 sidebar: false,

    aside: "left",

    logo: "/assets/logo.svg",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      // param1: pathname, param2: name
      auto("c++", "C++"),
      auto("network", "计算机网络"),
      auto("deep learning", "深度学习"),
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zyk-code' }
    ],

    footer: {
      message: "",
      copyright: "Copyright © 2024 zyk"
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
  // 插件
  markdown: {
    lineNumbers: true, // 开启代码块行号
    math: true,
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    // anchor: {
    //   permalink: markdownItAnchor.permalink.headerLink(),
    // },

    // // options for @mdit-vue/plugin-toc
    // // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    // toc: { level: [2, 3] },
    // config: (md) => {
    //   // use more markdown-it plugins!
    //   md.use(tocPlugin);
    // },
  },
})