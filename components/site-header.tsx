import { Code2, ArrowUpRight } from 'lucide-react';
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="zyk 首页">
          zyk<span className="brand-dot">.</span>
          <span className="brand-sub">笔记与实践</span>
        </a>
        <nav aria-label="主导航">
          <a href="/#knowledge">知识库</a>
          <a href="/#projects">项目与资源</a>
          <a
            href="https://github.com/zyk-code"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <Code2 size={17} /> GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}
