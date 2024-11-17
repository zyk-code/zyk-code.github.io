
import { DefaultTheme } from 'vitepress'
import nav from './nav.mts'
import sidebar from './sidebar.mts'

const themeConfig: DefaultTheme.Config=  {

    // 上下页
    // docFooter: {
    //   prev: 'Pagina prior',
    //   next: 'Proxima pagina'
    // },
    
    lastUpdatedText: "文章更新时间",

    outlineTitle: "文章目录",
    outline: [2, 6],

    
    sidebar,
    // // 不配置等同于 sidebar: false,
    // 默认在右边
    // aside: "left",
    
    logo: "/assets/logo.svg",

    // https://vitepress.dev/reference/default-theme-config
    nav,

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