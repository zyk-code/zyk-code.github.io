import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, BookOpen } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import MobileContents from '@/components/mobile-contents';
import articles from '@/data/articles.json';

type Props={params:Promise<{slug:string[]}>};
export function generateStaticParams(){return articles.map(article=>({slug:article.slug.split('/')}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;
  const article=articles.find(a=>a.slug===slug.join('/'));
  return article?{title:article.title,description:article.summary}:{};
}
export default async function ArticlePage({params}:Props){
  const {slug}=await params;
  const article=articles.find(a=>a.slug===slug.join('/'));
  if(!article) notFound();
  const siblings=articles.filter(a=>a.category===article.category);
  const current=siblings.findIndex(a=>a.slug===article.slug);
  const previous=siblings[current-1], next=siblings[current+1];
  const toc=article.toc.filter(h=>h.level<=3);
  return <><SiteHeader/><main className="container reader-grid">
    <article className="reader-article">
      <nav aria-label="面包屑" className="breadcrumb"><Link href="/#knowledge">知识库</Link><span>/</span><Link href={'/#'+article.category}>{article.categoryLabel}</Link></nav>
      <header className="article-heading"><div className="section-kicker">NOTES / {article.category.toUpperCase()}</div><h1>{article.title}</h1><p>{article.summary}</p><div className="article-meta"><span><BookOpen size={15}/> {article.isOutline?'学习提纲':'学习笔记'}</span><span><Clock3 size={15}/> 约 {article.minutes} 分钟</span><a href={article.sourceUrl} target="_blank" rel="noreferrer">原始笔记 <ArrowUpRight size={14}/></a></div></header>
      {article.isOutline&&<p className="outline-notice">这篇笔记目前是学习提纲，保留原有内容。</p>}
      <MobileContents headings={toc}/>
      <div className="prose" dangerouslySetInnerHTML={{__html:article.html}}/>
      <nav className="article-pagination" aria-label="上一篇和下一篇">{previous?<Link href={'/notes/'+previous.slug}><span><ArrowLeft size={14}/> 上一篇</span><strong>{previous.title}</strong></Link>:<Link href={'/#'+article.category}><span><ArrowLeft size={14}/> 返回目录</span><strong>{article.categoryLabel}</strong></Link>}{next&&<Link href={'/notes/'+next.slug}><span>下一篇 <ArrowRight size={14}/></span><strong>{next.title}</strong></Link>}</nav>
      <div className="article-end"><span>ZYK · 笔记与实践</span><Link href="/">返回首页 <ArrowUpRight size={14}/></Link></div>
    </article>
    {toc.length>0&&<aside className="article-toc"><nav aria-label="本文目录"><div className="toc-label">ON THIS PAGE</div><h2>本文目录</h2><ol>{toc.map(h=><li key={h.id} className={h.level===3?'toc-nested':''}><a href={'#'+h.id}>{h.text}</a></li>)}</ol><Link href={'/#'+article.category} className="toc-back"><ArrowLeft size={14}/> 浏览{article.categoryLabel}笔记</Link></nav></aside>}
  </main></>;
}
