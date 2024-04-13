import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页home', link: '/' },
      { text: '例子 dong', link: '/test/markdown-examples' }
    ],

    sidebar: [
      {
        text: '实例',
        items: [
          { text: 'Markdown Examples', link: '/test/markdown-examples' },
          { text: 'Runtime API Examples', link: '/test/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
