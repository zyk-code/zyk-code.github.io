import { defineConfig } from 'vitepress'
import themeConfig from './theme.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zyk",
  description: "文档站点",
  // base: "/",

  lastUpdated: true,
  
  // head标签配置
  head: [
    ["link", { rel: "icon", href: "/assets/logo.svg" }],
    // ["link",{ rel: "stylesheet", href: 'https://fonts.font.im/css?family=Oxygen', crossorigin: '' }],
  ],

  themeConfig,

  // 插件
  markdown: {
    lineNumbers: true, // 开启代码块行号
    math: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
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