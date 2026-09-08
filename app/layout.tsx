import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://zyk-code.github.io'),
  icons: { icon: '/favicon.svg' },
  title: { default: 'zyk · 笔记与实践', template: '%s | zyk 笔记' },
  description: '好记性不如，敲烂键盘。C++、计算机基础、深度学习与开发工具的个人技术笔记。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><a href="#main-content" className="skip-link">跳到主要内容</a><div id="main-content">{children}</div></body></html>;
}

