'use client';
import { useEffect, useState } from 'react';

import { Search, ArrowUpRight, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription } from '@/components/ui/empty';
import { matchesQuery, searchExcerpt } from '@/lib/note-search.mjs';
import notes from '@/data/search-index.json';
import topics from '@/data/topics.json';

export default function NoteDirectory() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  function updateQuery(value: string) {
    setQuery(value);
    setExpanded({});
  }
  useEffect(() => {
    function reveal(id: string) {
      if (topics.some((topic) => topic.id === id))
        setExpanded((previous) => ({ ...previous, [id]: true }));
    }
    const onHashChange = () => reveal(window.location.hash.slice(1));
    const onCategoryClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const href = event.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) reveal(href.slice(1));
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('click', onCategoryClick);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onCategoryClick);
    };
  }, []);
  const searching = query.trim().length > 0;
  const matches = notes.filter((note) =>
    matchesQuery(
      [
        note.title,
        note.summary,
        note.categoryLabel,
        note.file,
        note.searchText,
      ].join('\n'),
      query,
    ),
  );
  return (
    <section className="container directory-section" aria-label="全部笔记">
      <div className="note-search">
        <label htmlFor="note-search-input">查找笔记</label>
        <div className="note-search-control">
          <Search size={20} aria-hidden="true" />
          <Input
            id="note-search-input"
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') updateQuery('');
            }}
            placeholder="搜索标题、正文或代码…"
            aria-describedby="note-search-status"
            autoComplete="off"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => updateQuery('')}
            >
              清空
            </Button>
          )}
        </div>
        <output id="note-search-status" aria-live="polite">
          {searching
            ? `找到 ${matches.length} 篇匹配的笔记`
            : `共 ${notes.length} 篇笔记 · 支持多个关键词，以空格分隔`}
        </output>
      </div>
      {topics.map((topic, i) => {
        const group = matches.filter((note) => note.category === topic.id);
        const total = notes.filter((note) => note.category === topic.id).length;
        return (
          <Collapsible
            id={topic.id}
            className="directory-category directory-fold"
            key={topic.id}
            open={expanded[topic.id] ?? (searching && group.length > 0)}
            onOpenChange={(open) =>
              setExpanded((previous) => ({ ...previous, [topic.id]: open }))
            }
          >
            <h2 className="directory-fold-heading">
              <CollapsibleTrigger className="directory-toggle">
                <span className="directory-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="directory-title">{topic.title}</span>
                <span className="directory-tags">{topic.tags}</span>
                <span className="directory-count">
                  {searching ? `${group.length} / ${total}` : total} 篇笔记
                </span>
                <ChevronDown
                  className="directory-chevron"
                  size={20}
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
            </h2>
            <CollapsibleContent keepMounted className="directory-fold-content">
              {group.length ? (
                <div className="note-list">
                  {group.map((article) => (
                    <a
                      className="note-link"
                      href={'/notes/' + article.slug}
                      key={article.slug}
                    >
                      <div>
                        <span className="note-subcategory">
                          {article.file.split('/').length > 2
                            ? article.file.split('/')[1]
                            : topic.title}
                        </span>
                        <h3>
                          {article.title}
                          <ArrowUpRight size={15} />
                        </h3>
                        <p>
                          {searching
                            ? searchExcerpt(article.searchText, query) ||
                              article.summary
                            : article.summary}
                        </p>
                      </div>
                      <span className="note-time">
                        {article.isOutline
                          ? '学习提纲'
                          : `约 ${article.minutes} 分钟`}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <Empty className="category-empty">
                  <EmptyDescription>
                    {searching
                      ? '这个分类暂无匹配结果，可以减少关键词再试。'
                      : '这个分类还没有笔记。'}
                  </EmptyDescription>
                </Empty>
              )}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </section>
  );
}
