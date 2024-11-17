import { DefaultTheme } from 'vitepress'
import { auto } from '../ulits/auto.mjs'

const Nav: DefaultTheme.Config['nav'] = [

    { text: '首页', link: '/' },
    { text: 'C++语言及其工具链接', link: '/C++/' },
    { text: '计算机', link: '/计算机/', activeMatch: '/计算机/' },
    { text: '深度学习', link: '/深度学习/', activeMatch: '/深度学习/'},
    { text: '其他', link: '/其他/', activeMatch: '/其他/' }
]
  
export default Nav