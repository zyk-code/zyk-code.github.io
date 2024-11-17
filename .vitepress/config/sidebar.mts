import { DefaultTheme } from 'vitepress'
import { auto } from '../ulits/auto.mjs'
import { SidebarMulti, SidebarItem } from 'vitepress/types/default-theme'

const CpulsItems: SidebarItem[] = [
  { text: '语法基础', link: './' },
  { text: '面向对象', link: './面向对象' },
  { text: 'C++11新特性', link: './C++11新特性' },
  { text: 'STL', link: './STL' },
  { text: '并发编程', link: './并发编程' },
  { text: '设计模式', link: './设计模式' },
  { text: '动态库与静态库', link: './动态库与静态库' },
  { text: 'make和CMake', link: './make'},
  { text: 'GDB调试', link: './GDB' }
]

const DeelLearing: SidebarItem[] = [
  { text: '基础', link: './' },
  { text: '分类网络', link: './分类网络' },
  { text: 'RCNN系列', link: './RCNN系列' },
  { text: '视觉Transformer', link: './VIT' },
  { text: 'DINO的训练日志', link: './DINO的训练日志' },
  { text: 'mmdetection', link: './mmdetection' },
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
      link: "./操作系统"
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
    { text: '树', link: '/树' },
    { text: '哈希', link: '/哈希' },
    { text: '排序', link:'/排序' },
  ]
 }

const Computer: SidebarItem[] = [
  ConputerNetWork,
  ConputerOS,
  Data,
  Test,
]

const Other: SidebarItem[] = [
  { text: 'Git', link: './Git' },
  { text: 'Linux', link: './Linux' },
  { text: 'Docker', link: './Docker' },
]

const sidebar: SidebarMulti = {
  '/C++': {
    collapsed: false,
    items: CpulsItems,
  },
  "/深度学习": DeelLearing,
  "/计算机": {
    base: "/计算机/",
    items:Computer,
  },
  "/其他": Other,
};

export default sidebar