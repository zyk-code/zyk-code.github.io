# zyk · 笔记与实践

个人技术笔记站点，涵盖 C++、计算机基础、深度学习和开发工具。

网站：https://zyk-code.github.io/

## 笔记浏览

首页支持标题、分类、正文与代码全文搜索。多个关键词用空格分隔；匹配结果按分类展示，并显示正文摘要。支持清空搜索和 Escape 快捷键。

## 本地开发

使用 Node.js 22.13+ 和 pnpm 10.12.1：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 修改笔记

文章 Markdown 继续保存在原有的 `C++/`、`计算机/`、`深度学习/`、`其他/` 目录，图片位于 `public/note/`。
运行 `pnpm dev` 后，修改 Markdown 或目录配置会自动刷新预览。新增笔记时，在 `data/catalog.json` 中登记 category、slug、file、title 和 summary；分类标题和首页介绍在 `data/topics.json` 中维护。文章总数与各分类数量自动计算。

首页、文章页和样式分别位于 `app/page.tsx`、`app/notes/[...slug]/page.tsx`、`app/globals.css`。`data/articles.json` 和 `data/search-index.json` 从 Markdown 自动生成，请勿直接编辑。

## 代码检查

运行 `pnpm check` 检查代码、类型，以及新增文章、公式、目录锚点、图片和无效输入的回归用例。提交时 GitHub Actions 也会执行这些检查。

## 发布

```sh
pnpm build
```

构建输出到 `dist/client/`。推送到 `main` 后，GitHub Actions 自动构建并部署到 GitHub Pages，无需额外 PAT。原 VitePress 文章地址保留静态跳转。

基于 React、Vinext 和 Markdown-it；代码、数学公式与原有配图均保留。

原站鸣谢：[Albert Zhang](https://github.com/AZCodingAccount)。

页面间导航使用原生链接，直接打开 GitHub Pages 导出的 HTML，避免客户端路由对动态服务的依赖。
