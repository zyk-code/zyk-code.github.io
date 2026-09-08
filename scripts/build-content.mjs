import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import MarkdownIt from 'markdown-it';
import mathjax from 'markdown-it-mathjax3';

const root = path.resolve(process.argv[2] ?? '.');
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, 'data/catalog.json'), 'utf8'),
);
const topics = JSON.parse(
  fs.readFileSync(path.join(root, 'data/topics.json'), 'utf8'),
);
const categories = Object.fromEntries(
  topics.map((topic) => [topic.id, topic.title]),
);
assert(catalog.length > 0, 'The article catalog must not be empty');
assert.equal(
  new Set(catalog.map((a) => a.category + '/' + a.slug)).size,
  catalog.length,
  'Duplicate article slug',
);
assert.equal(
  new Set(catalog.map((a) => a.file)).size,
  catalog.length,
  'Duplicate article source',
);
const md = new MarkdownIt({ html: false }).use(mathjax);
const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, i, options, env, renderer) => {
  const token = tokens[i];
  if (
    token.info.trim() === 'mermaid' &&
    token.content.trim() === 'flowchart LR\n  start --> main --> exit'
  ) {
    return '<div class="program-flow" role="img" aria-label="程序执行流程：start 到 main 到 exit"><span>start</span><b aria-hidden="true">→</b><span>main</span><b aria-hidden="true">→</b><span>exit</span></div>';
  }
  return defaultFence(tokens, i, options, env, renderer);
};
md.renderer.rules.table_open = () => '<div class="table-scroll"><table>';
md.renderer.rules.table_close = () => '</table></div>';
const defaultImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens, i, options, env, renderer) => {
  const token = tokens[i];
  const src = token.attrGet('src');
  if (src.startsWith('/')) {
    const publicRoot = path.join(root, 'public');
    const imagePath = path.resolve(publicRoot, '.' + decodeURIComponent(src));
    assert(
      imagePath.startsWith(publicRoot + path.sep),
      'Image path escapes public directory',
    );
    assert(fs.existsSync(imagePath), 'Missing image: ' + src);
  }
  token.attrSet('loading', 'lazy');
  if (
    !token.content ||
    token.content === 'alt text' ||
    token.content === 'alt test'
  ) {
    token.content =
      (typeof env.title === 'string' ? env.title : '文章') + '配图';
    token.children = [{ type: 'text', content: token.content }];
  }
  return defaultImage(tokens, i, options, env, renderer);
};
const articles = catalog.map(({ category, slug, file, title, summary }) => {
  assert(
    Object.hasOwn(categories, category),
    'Unknown article category: ' + category,
  );
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),
    'Invalid article slug: ' + slug,
  );
  assert(typeof title === 'string' && title.trim(), 'Missing article title');
  const sourcePath = path.resolve(root, file);
  assert(
    sourcePath.startsWith(root + path.sep) && sourcePath.endsWith('.md'),
    'Invalid article source path',
  );
  let source = fs.readFileSync(sourcePath, 'utf8').replaceAll('\r\n', '\n');
  // Correct the nine malformed image references in the original exam notes.
  source = source.replace(/!\[\]\*\(\.\/note\//g, '![](/note/');
  const env = { title };
  const tokens = md.parse(source, env);
  if (tokens[0]?.type === 'heading_open' && tokens[0].tag === 'h1')
    tokens.splice(0, 3);
  const toc = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open') continue;
    if (tokens[i].tag === 'h1') {
      tokens[i].tag = 'h2';
      tokens[i + 2].tag = 'h2';
    }
    const id = `section-${toc.length + 1}`;
    tokens[i].attrSet('id', id);
    toc.push({
      id,
      text: tokens[i + 1].content.replace(/[`*]/g, ''),
      level: Number(tokens[i].tag[1]),
    });
  }
  const html = md.renderer.render(tokens, md.options, env);
  assert(
    !/<script\b|<[^>]*\son\w+\s*=/i.test(html),
    'Unexpected active content',
  );
  const isOutline = source.trim().length < 100;
  return {
    category,
    categoryLabel: categories[category],
    slug: `${category}/${slug}`,
    file,
    title,
    summary,
    html,
    toc,
    isOutline,
    minutes: Math.max(
      1,
      Math.ceil(source.replace(/```[\s\S]*?```/g, '').length / 450),
    ),
    sourceUrl: `https://github.com/zyk-code/zyk-code.github.io/blob/main/${file.split('/').map(encodeURIComponent).join('/')}`,
    searchText: source.replace(/\s+/g, ' ').trim(),
  };
});
assert.equal(articles.length, catalog.length);
assert.equal(new Set(articles.map((a) => a.slug)).size, articles.length);
for (const article of articles)
  for (const h of article.toc) assert(article.html.includes(`id="${h.id}"`));
fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'data/articles.json'),
  JSON.stringify(articles),
);
fs.writeFileSync(
  path.join(root, 'data/search-index.json'),
  JSON.stringify(
    articles.map(
      ({ html: _html, toc: _toc, sourceUrl: _sourceUrl, ...article }) =>
        article,
    ),
  ),
);
console.log(
  `Prepared ${articles.length} articles; sources, image references and headings verified.`,
);
