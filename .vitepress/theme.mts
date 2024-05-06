import { auto } from './ulits/auto.mjs'
import { DefaultTheme } from 'vitepress'

const themeConfig: DefaultTheme.Config=  {

    // 上下页
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    },
    
    lastUpdatedText: "文章更新时间",

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
      auto("软考"),
      auto("network", "计算机网络"),
      auto("Data Structure and Algorithms", "数据结构与算法"),
      auto("deep learning", "深度学习"),
      auto("notes", "杂记"),
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zyk-code' }
    ],

    footer: {
      message: 'Released under the <a href="#">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://www.github.com/zyk-code">zyk</a>'
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
}

export default themeConfig