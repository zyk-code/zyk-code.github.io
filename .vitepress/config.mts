// import { defineConfig } from 'vitepress'
import themeConfig from './config/theme.mjs'
// import { fileURLToPath } from 'url' 
import { withMermaid } from "vitepress-plugin-mermaid"
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "zyk",
  description: "文档站点",
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
    config: (md) => {
      md.use(mathjax3);
    },
  },

  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  },
  // srcDir: "./src",
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