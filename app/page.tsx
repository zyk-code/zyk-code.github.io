import SiteHeader from '@/components/site-header';
import projects from '@/data/projects.json';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Cpu,
  Terminal,
  Network,
} from 'lucide-react';
const projectIcons: Record<string, LucideIcon> = { cpu: Cpu, network: Network };
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="container hero-grid hero-simple">
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
              <a className="primary-link" href="/library">
                翻开我的笔记 <ArrowRight size={18} />
              </a>
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
        <section id="projects" className="container project-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">01 / BUILD & EXPLORE</div>
              <h2>
                写下来，也做出来<span>.</span>
              </h2>
            </div>
            <p>一些动手实践，和值得反复打开的资源。</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => {
              const Icon = projectIcons[project.icon] ?? Code2;
              return (
                <a
                  className="project-card project-dark"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  key={project.href}
                >
                  <div className="project-top">
                    <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
                    <ArrowUpRight size={23} />
                  </div>
                  <Icon size={38} />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-tag">
                    {project.tags.join(' · ')}
                  </span>
                </a>
              );
            })}
            <div className="resource-list project-resources">
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
