import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import MarkdownIt from 'markdown-it';
import mathjax from 'markdown-it-mathjax3';

const catalog = [
 ['cpp','basics','C++/语言/basic.md','C++ 语言基础','程序入口、函数重载、宏定义与类型转换。'],
 ['cpp','oop','C++/语言/oop.md','面向对象','封装、继承、多态，以及对象在内存中的样子。'],
 ['cpp','cpp11','C++/语言/C++11.md','C++11 新特性','移动语义、右值引用与现代 C++ 的常用特性。'],
 ['cpp','stl','C++/语言/STL.md','STL 标准模板库','常用容器、算法与迭代器的使用笔记。'],
 ['cpp','concurrency','C++/语言/并发编程.md','并发编程','线程、互斥与同步，理解并发中的协作。'],
 ['cpp','gdb','C++/工具/GDB.md','GDB 调试','断点、运行控制与调试命令。'],
 ['cpp','make','C++/工具/make.md','Make 构建工具','Makefile 规则与编译流程。'],
 ['cpp','libraries','C++/工具/lb.md','静态库与动态库','编译、链接与库文件的使用。'],
 ['computer','operating-systems','计算机/操作系统/操作系统.md','操作系统','并发、进程、互斥与同步的基础。'],
 ['computer','linked-list','计算机/数据结构/链表.md','链表','链表反转与环检测。'],
 ['computer','hash','计算机/数据结构/哈希.md','哈希表','哈希表的结构与应用。'],
 ['computer','trees','计算机/数据结构/树.md','树与二叉树','遍历、搜索与平衡树。'],
 ['computer','network-basics','计算机/计算机网络/基础概念和体系结构.md','网络基础与体系结构','计算机网络的基本概念和分层体系。'],
 ['computer','physical-layer','计算机/计算机网络/物理层.md','物理层','数据通信与物理层的基础。'],
 ['computer','data-link','计算机/计算机网络/数据链路层.md','数据链路层','链路、帧与数据传输。'],
 ['computer','tcp','计算机/计算机网络/三次握手和四次挥手.md','TCP 三次握手与四次挥手','连接如何建立，又如何关闭。'],
 ['computer','design-principles','计算机/设计模式/基本原则.md','设计模式 · 基本原则','设计模式的学习提纲。'],
 ['computer','creational','计算机/设计模式/创建型.md','创建型设计模式','对象创建相关的模式与实现笔记。'],
 ['computer','structural','计算机/设计模式/结构型.md','结构型设计模式','结构型模式的学习提纲。'],
 ['computer','behavioral','计算机/设计模式/行为型.md','行为型设计模式','对象交互与行为组织的学习笔记。'],
 ['computer','exam-architecture','计算机/软考/第一章.md','软考 · 计算机系统知识','计算机组成原理、存储与系统知识。'],
 ['computer','exam-languages','计算机/软考/第二章.md','软考 · 程序设计语言','程序语言、编译与文法。'],
 ['computer','exam-structures','计算机/软考/第三章.md','软考 · 数据结构','线性结构、树与排序的复习笔记。'],
 ['ai','basics','深度学习/基础.md','深度学习基础','前向传播、损失函数、反向传播与参数更新。'],
 ['ai','classification','深度学习/分类网络.md','图像分类网络','经典分类网络与结构演进。'],
 ['ai','vit','深度学习/VIT.md','Vision Transformer','视觉 Transformer 的原理与实现。'],
 ['ai','rcnn','深度学习/RCNN系列.md','R-CNN 系列目标检测','R-CNN 系列算法的学习记录。'],
 ['ai','mmdetection','深度学习/mmdetection.md','MMDetection 2 安装与训练','环境配置、数据集与模型训练。'],
 ['ai','dino','深度学习/DINO的训练日志.md','DINO 训练日志','模型训练过程中的配置与问题记录。'],
 ['tools','linux','其他/Linux.md','Linux 基础知识','文件操作、权限与常用命令。'],
 ['tools','git','其他/Git.md','Git 版本管理','日常操作、分支与协作流程。'],
 ['tools','docker','其他/Docker.md','Docker 容器','镜像、容器与开发环境配置。'],
];
const categories = {cpp:'C++',computer:'计算机基础',ai:'深度学习',tools:'开发工具'};
const md = new MarkdownIt({html:false}).use(mathjax);
const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, i, options, env, renderer) => {
  const token = tokens[i];
  if (token.info.trim() === 'mermaid' && token.content.trim() === 'flowchart LR\n  start --> main --> exit') {
    return '<div class="program-flow" role="img" aria-label="程序执行流程：start 到 main 到 exit"><span>start</span><b aria-hidden="true">→</b><span>main</span><b aria-hidden="true">→</b><span>exit</span></div>';
  }
  return defaultFence(tokens,i,options,env,renderer);
};
md.renderer.rules.table_open=()=>'<div class="table-scroll"><table>';
md.renderer.rules.table_close=()=>'</table></div>';
const defaultImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens,i,options,env,renderer) => {
  const token=tokens[i];
  const src=token.attrGet('src');
  if(src.startsWith('/')) assert(fs.existsSync(path.join('public',decodeURIComponent(src))),`Missing image: ${src}`);
  token.attrSet('loading','lazy');
  if (!token.content || token.content === 'alt text' || token.content === 'alt test') {
    token.content = `${env.title}配图`;
    token.children=[{type:'text',content:token.content}];
  }
  return defaultImage(tokens,i,options,env,renderer);
};
const articles=catalog.map(([category,slug,file,title,summary])=>{
  let source=fs.readFileSync(file,'utf8').replaceAll('\r\n','\n');
  // Correct the nine malformed image references in the original exam notes.
  source=source.replace(/!\[\]\*\(\.\/note\//g,'![](/note/');
  const env={title};
  const tokens=md.parse(source,env);
  if(tokens[0]?.type==='heading_open' && tokens[0].tag==='h1') tokens.splice(0,3);
  const toc=[];
  for(let i=0;i<tokens.length;i++) {
    if(tokens[i].type!=='heading_open') continue;
    if(tokens[i].tag==='h1') { tokens[i].tag='h2'; tokens[i+2].tag='h2'; }
    const id=`section-${toc.length+1}`;
    tokens[i].attrSet('id',id);
    toc.push({id,text:tokens[i+1].content.replace(/[`*]/g,''),level:Number(tokens[i].tag[1])});
  }
  const html=md.renderer.render(tokens,md.options,env);
  assert(!/<script\b|\bonerror\s*=/i.test(html),'Unexpected active content');
  const isOutline=source.trim().length<100;
  return {category,categoryLabel:categories[category],slug:`${category}/${slug}`,file,title,summary,html,toc,isOutline,minutes:Math.max(1,Math.ceil(source.replace(/```[\s\S]*?```/g,'').length/450)),sourceUrl:`https://github.com/zyk-code/zyk-code.github.io/blob/main/${file.split('/').map(encodeURIComponent).join('/')}`};
});
assert.equal(articles.length,32);
assert.equal(new Set(articles.map(a=>a.slug)).size,32);
assert(articles.find(a=>a.slug==='ai/basics').html.includes('<svg'));
assert(articles.find(a=>a.slug==='cpp/basics').html.includes('program-flow'));
for(const article of articles) for(const h of article.toc) assert(article.html.includes(`id="${h.id}"`));
fs.mkdirSync('data',{recursive:true});
fs.writeFileSync('data/articles.json',JSON.stringify(articles));
console.log(`Prepared ${articles.length} articles; image references, headings, math and flow diagram verified.`);

