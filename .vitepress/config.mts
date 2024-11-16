import { defineConfig } from 'vitepress'
import themeConfig from './theme.mjs'
import { fileURLToPath } from 'url' 

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zyk",
  description: "文档站点",
  // base: "/",

  lastUpdated: true,
  
  // head标签配置
  head: [
    ["link", { rel: "icon", href: "/assets/logo.svg" }],
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
  },

  vite: {
    resolve: {
      // 重写组件
      alias: [
        // 导航栏
        // {
        //   find: /^.*\/VPNavBar\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('./components/Reset/index.vue', import.meta.url)
        //   )
        // },
        // hero
        // {
        //   find: /^.*\/VPHero\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL("./components/Reset/index.vue", import.meta.url)
        //   ),
        // },
        // feature
        // {
        //   find: /^.*\/VPFeature\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL("./components/Reset/index.vue", import.meta.url)
        //   ),
        // },
        // {
        //   find: /^.*\/VPSidebarItem\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL("./components/Reset/index.vue", import.meta.url)
        //   ),
        // },
      ]
    }
  }
})