import Link from 'next/link';
import SiteHeader from '@/components/site-header';
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="container missing-page">
        <div className="section-kicker">404 / NOTE NOT FOUND</div>
        <h1>这页笔记还没有写下。</h1>
        <p>可以回到知识库，继续探索其他内容。</p>
        <Link className="primary-link" href="/#knowledge">
          返回知识库 →
        </Link>
      </main>
    </>
  );
}
