# vitepress 使用记录

## 自定义组件

1. 在根目录下`compoments/`,创建vue组件,并编写代码.
2. 在`theme/index.ts`中引入组件,并注册.
3. 在`自定义.md`中使用组件.
```md
---
layout: page
title: 使用自定义组件的页面
---
 <TCardComponent />
```
