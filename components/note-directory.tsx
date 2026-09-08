'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription } from '@/components/ui/empty';
import { matchesQuery, searchExcerpt } from '@/lib/note-search.mjs';
import notes from '@/data/search-index.json';
import topics from '@/data/topics.json';

export default function NoteDirectory() {
  const [query, setQuery] = useState('');
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
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setQuery('');
            }}
            placeholder="搜索标题、正文或代码…"
            aria-describedby="note-search-status"
            autoComplete="off"
          />
          {query && (
            <Button type="button" variant="ghost" onClick={() => setQuery('')}>
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
          <section id={topic.id} className="directory-category" key={topic.id}>
            <div className="directory-label">
              <span className="directory-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2>{topic.title}</h2>
              <p>{topic.tags}</p>
              <span className="directory-count">
                {searching ? `${group.length} / ${total}` : total} 篇笔记
              </span>
            </div>
            {group.length ? (
              <div className="note-list">
                {group.map((article) => (
                  <Link
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
                  </Link>
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
          </section>
        );
      })}
    </section>
  );
}
