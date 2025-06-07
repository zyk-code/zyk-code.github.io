import { DefaultTheme } from 'vitepress'
import { auto } from '../ulits/auto.mjs'

/*
  * 导航栏
  * 1、每个文件夹的顶层目录名称
  * 2、连接的路径是文件夹的首个目录首文件/本目录首文件
*/
const Nav: DefaultTheme.Config['nav'] = [

    { text: '首页', link: '/' },
    { text: 'C++', link: '/C++/语言/basic' },
    { text: '计算机', link: '/计算机/操作系统/操作系统', activeMatch: '/计算机/' },
    { text: '深度学习', link: '/深度学习/基础', activeMatch: '/深度学习/'},
    { text: '项目', link: '/', activeMatch: '/'},
    // { text: 'LLM', link: '/LLM/', activeMatch: '/LLM/'},
    { text: '其他', link: '/其他/Git', activeMatch: '/其他/' }
]
  
export default Nav