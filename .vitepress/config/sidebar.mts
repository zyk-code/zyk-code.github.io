import { DefaultTheme } from 'vitepress'
import { auto } from '../ulits/auto.mjs'
import { SidebarMulti, SidebarItem } from 'vitepress/types/default-theme'

/*
  * 侧边栏配置
  * 1、文件嵌套不超过两层。
  * 2、两层的目录使用嵌套对象封装，单一文件夹封装
*/
const Grammar: SidebarItem = {
   text: "语法",
  base: "/C++/语法",
  items: [
    {
      text: "基础",
      link: "/basic"
    },
    {
      text: "面向对象",
      link: "/oop"
    },
    {
      text: "STL",
      link: "/STL"
    },
    {
      text: "C++11",
      link: "/C++11"
    },
    {
      text: "并发编程",
      link: "/并发编程"
    },
  ],
}
const Tool: SidebarItem = {
  text: "工具",
  base: "/C++/工具",
  items: [
    {
      text: "GDB",
      link: "/GDB"
    },
    {
      text: "Make",
      link: "/make"
    } ,
    {
      text: "动态库和静态库",
      link: "/lb"
    } 
  ],
}

// C++
const Cplusplus: SidebarItem[] = [
  Tool,
  Grammar,
]
  
const ConputerNetWork: SidebarItem = {
  text: "计算机网络",
  base: "/计算机/计算机网络",
  items:[
    {
      text: "基础概念和体系结构",
      link : "/基础概念和体系结构",
    },
    {
      text: "物理层",
      link : "/物理层",
    },
    {
      text: "数据链路层",
      link : "/数据链路层",
    },
    {
      text: "三次握手和四次挥手",
      link : "/三次握手和四次挥手",
    },
  ]
}
const ConputerOS: SidebarItem = {
  text: "操作系统",
  items: [
    {
      text: "操作系统",
      link: "/操作系统/操作系统"
    } 
  ],
}

const Test: SidebarItem = {
  text: "软考",
  base: "/计算机/软考/",
  items: [
    { text: '第一章', link: '/第一章' },
    { text: '第二章', link: '/第二章' },
    { text: '第三章', link: '/第三章' },
  ],
}

const Data: SidebarItem = {
  text: "数据结构",
  base: "/计算机/数据结构/",
  items: [
    { text: '链表', link:'/链表' },
    { text: '树', link: '/树' },
    // { text: '图', link: '/图' },
    { text: '哈希', link: '/哈希' },
  ]
 }

 // 计算机
const Computer: SidebarItem[] = [
  ConputerNetWork,
  ConputerOS,
  Data,
  Test,
]

// 深度学习
const DeelLearing: SidebarItem[] = [
  { text: '基础', link: './基础' },
  { text: '分类网络', link: './分类网络' },
  { text: 'RCNN系列', link: './RCNN系列' },
  { text: '视觉Transformer', link: './VIT' },
  { text: 'DINO的训练日志', link: './DINO的训练日志' },
  { text: 'mmdetection', link: './mmdetection' },
]


// 项目
const Project: SidebarItem[] = [
  
]

// 其他
const Other: SidebarItem[] = [
  { text: 'Git', link: '/Git' },
  { text: 'Linux', link: '/Linux' },
  { text: 'Docker', link: '/Docker' },
]
// 主的配置项
const sidebar: SidebarMulti = {
  '/C++': {
    base: "/C++/",
    items: Cplusplus,
  },
  "/深度学习": {
    base: "/深度学习/",
    items: DeelLearing,
  },
  "/计算机": {
    base: "/计算机/",
    items:Computer,
  },
  "/其他": {
    base: "/其他/",
    items: Other,
  },
};

export default sidebar