# zyk · 笔记与实践

个人技术笔记站点，涵盖 C++、计算机基础、深度学习和开发工具。

网站：https://zyk-code.github.io/

## 本地开发

使用 Node.js 22.13+ 和 pnpm 10.12.1：

```sh
pnpm install --frozen-lockfile
node scripts/build-content.mjs
pnpm dev
```

## 修改笔记

文章 Markdown 继续保存在原有的 `C++/`、`计算机/`、`深度学习/`、`其他/` 目录，图片位于 `public/note/`。
修改后运行 `node scripts/build-content.mjs` 重新生成阅读内容。新增笔记时，在 `scripts/build-content.mjs` 的 catalog 中登记分类、路径、标题和摘要。

首页、文章页和样式分别位于 `app/page.tsx`、`app/notes/[...slug]/page.tsx`、`app/globals.css`。`data/articles.json` 是从 Markdown 生成的内容，请勿直接编辑。

## 发布

```sh
pnpm build
```

构建输出到 `dist/client/`。推送到 `main` 后，GitHub Actions 自动构建并部署到 GitHub Pages，无需额外 PAT。原 VitePress 文章地址保留静态跳转。

基于 React、Vinext 和 Markdown-it；代码、数学公式与原有配图均保留。

原站鸣谢：[Albert Zhang](https://github.com/AZCodingAccount)。
