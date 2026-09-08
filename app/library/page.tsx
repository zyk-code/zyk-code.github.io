import NoteDirectory from '@/components/note-directory';
import topicDefinitions from '@/data/topics.json';
import type { LucideIcon } from 'lucide-react';

import SiteHeader from '@/components/site-header';
import articles from '@/data/articles.json';
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Cpu,
  BrainCircuit,
  Terminal,
} from 'lucide-react';
const topicIcons: Record<string, LucideIcon> = {
  cpp: Code2,
  computer: Cpu,
  ai: BrainCircuit,
  tools: Terminal,
};
const topics = topicDefinitions.map((topic) => ({
  ...topic,
  Icon: topicIcons[topic.id] ?? Code2,
  count: articles.filter((a) => a.category === topic.id).length,
}));

export const metadata = {
  title: '知识库',
  description: '按分类浏览和搜索 C++、计算机基础、深度学习与开发工具笔记。',
};
export default function Library() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="library-page">
        <section id="knowledge" className="container knowledge-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">01 / KNOWLEDGE BASE</div>
              <h1>
                知识有迹可循<span>.</span>
              </h1>
            </div>
            <p>
              四个方向，持续积累。
              <br />
              从感兴趣的主题开始阅读。
            </p>
          </div>
          <div className="topic-grid">
            {topics.map((t) => (
              <a className="topic-card" href={'#' + t.id} key={t.id}>
                <div className="topic-top">
                  <t.Icon size={24} />
                  <span>
                    {String(t.count).padStart(2, '0')} 篇{' '}
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <div className="topic-en">{t.en}</div>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <div className="topic-tags">
                  {t.tags}
                  <ArrowRight size={17} />
                </div>
              </a>
            ))}
          </div>
        </section>
        <NoteDirectory />
      </main>
      <footer className="site-footer container">
        <a href="/">← 返回首页</a>
      </footer>
    </>
  );
}
