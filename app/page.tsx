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
  CornerDownRight,
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
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" /> ZYK’S DIGITAL NOTEBOOK{' '}
                <span className="edition">/ 01</span>
              </div>
              <h1>
                好记性不如，
                <br />
                <span>敲烂键盘。</span>
              </h1>
              <p>
                在代码里探索，在实践中理解。
                <br />
                这里是我的技术笔记，也是一段持续积累的过程。
              </p>
              <a className="primary-link" href="#knowledge">
                翻开我的笔记 <ArrowRight size={18} />
              </a>
            </div>
            <div className="index-panel">
              <div className="index-top">
                <span>
                  <Terminal size={16} /> ~/knowledge
                </span>
                <span>INDEX</span>
              </div>
              <div className="index-content">
                <p className="code-comment">
                  {'// 把零散的知识，写成自己的理解'}
                </p>
                {topics.map((t, i) => (
                  <a href={'#' + t.id} className="index-line" key={t.id}>
                    <span className="line-number">0{i + 1}</span>
                    <CornerDownRight size={15} />
                    <strong>{t.title}</strong>
                    <span className="index-count">
                      {String(t.count).padStart(2, '0')} notes
                    </span>
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
              <div className="index-bottom">
                <span>
                  <span className="status-dot" /> learning by doing
                </span>
                <span>{articles.length} 篇笔记</span>
              </div>
            </div>
          </div>
          <div className="container hero-foot">
            <span>CODE. LEARN. REPEAT.</span>
            <span>
              从一个问题开始，到一次真正的理解。{' '}
              <span className="foot-arrow">↓</span>
            </span>
          </div>
        </section>
        <section id="knowledge" className="container knowledge-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">01 / KNOWLEDGE BASE</div>
              <h2>
                知识有迹可循<span>.</span>
              </h2>
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
        <section id="projects" className="container project-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 / BUILD & EXPLORE</div>
              <h2>
                写下来，也做出来<span>.</span>
              </h2>
            </div>
            <p>一些动手实践，和值得反复打开的资源。</p>
          </div>
          <div className="project-grid">
            <a
              className="project-card project-dark"
              href="https://gitee.com/zou-yongqiu/esp8266"
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-top">
                <span>PROJECT / 01</span>
                <ArrowUpRight size={23} />
              </div>
              <Cpu size={38} />
              <h3>ESP8266 数据采集</h3>
              <p>
                在 Web 端查看 ADXL345 或 MPU6050
                传感器的数据，把硬件采集连接到物联网应用。
              </p>
              <span className="project-tag">
                IoT <i /> ESP8266 <i /> Web
              </span>
            </a>
            <div className="resource-list">
              <a
                href="https://github.com/zyk-code/zyk-code.github.io"
                target="_blank"
                rel="noreferrer"
              >
                <span className="resource-icon">
                  <Code2 />
                </span>
                <div>
                  <span className="resource-label">OPEN SOURCE</span>
                  <h3>笔记站点源码</h3>
                  <p>技术笔记、阅读页面与自动发布</p>
                </div>
                <ArrowUpRight />
              </a>
              <a
                href="https://leetcode.cn/u/a-e-ovo/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="resource-icon">
                  <Terminal />
                </span>
                <div>
                  <span className="resource-label">DAILY PRACTICE</span>
                  <h3>力扣 · 每天一道题</h3>
                  <p>在解决问题的过程中练习思考</p>
                </div>
                <ArrowUpRight />
              </a>
              <a
                href="https://www.bilibili.com/video/BV1Cm4y1d7Ur"
                target="_blank"
                rel="noreferrer"
              >
                <span className="resource-icon">
                  <Cpu />
                </span>
                <div>
                  <span className="resource-label">LEARNING RESOURCE</span>
                  <h3>南京大学 · 操作系统</h3>
                  <p>蒋炎岩老师的 2022 操作系统课程</p>
                </div>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="brand" href="/">
          zyk<span className="brand-dot">.</span>
        </a>
        <p>把学到的留下，把想做的实现。</p>
        <div>
          <a
            href="https://gitee.com/zou-yongqiu"
            target="_blank"
            rel="noreferrer"
          >
            Gitee ↗
          </a>
          <a
            href="https://github.com/zyk-code"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a href="#page-top">回到顶部 ↑</a>
        </div>
      </footer>
    </>
  );
}
