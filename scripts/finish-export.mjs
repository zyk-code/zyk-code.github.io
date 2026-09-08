import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const output = path.resolve('dist/client');
const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
assert(
  fs.existsSync(path.join(output, 'index.html')),
  'Homepage was not exported',
);
assert(
  fs.existsSync(path.join(output, '404.html')),
  '404 page was not exported',
);
for (const article of articles) {
  const page = path.join(output, 'notes', article.slug + '.html');
  assert(fs.existsSync(page), `Missing exported article: ${article.slug}`);
  const html = fs.readFileSync(page, 'utf8');
  assert(
    html.includes(escape(article.title)),
    `Missing article title: ${article.slug}`,
  );
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g,
  )) {
    const href = decodeURIComponent(match[1]);
    const asset = path.join(output, href);
    assert(
      fs.existsSync(asset) ||
        fs.existsSync(asset + '.html') ||
        fs.existsSync(path.join(asset, 'index.html')),
      `Missing exported link or asset: ${href}`,
    );
  }
  const destination = `/notes/${article.slug}`;
  const redirect = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(article.title)} | zyk 笔记</title><meta http-equiv="refresh" content="0; url=${destination}"><link rel="canonical" href="https://zyk-code.github.io${destination}"></head><body><p>笔记已迁移至 <a href="${destination}">${escape(article.title)}</a>。</p></body></html>`;
  const oldPath = article.file.replace(/\.md$/, '');
  for (const relative of [oldPath + '.html', oldPath + '/index.html']) {
    const target = path.resolve(output, relative);
    assert(target.startsWith(output + path.sep), 'Unexpected redirect path');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, redirect);
  }
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
const homepage = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
for (const article of articles)
  assert(
    homepage.includes(`href="/notes/${article.slug}"`),
    `Missing homepage article link: ${article.slug}`,
  );
// GitHub Pages serves documents; framework Link interception must not return.
for (const file of [
  'app/page.tsx',
  'app/not-found.tsx',
  'app/notes/[...slug]/page.tsx',
  'components/note-directory.tsx',
  'components/site-header.tsx',
]) {
  assert(
    !/from\s+['"]next\/link['"]/.test(fs.readFileSync(file, 'utf8')),
    `Use document navigation for static hosting: ${file}`,
  );
}
console.log(
  `Validated homepage, 404, ${articles.length} articles, local assets and ${articles.length * 2} legacy redirects.`,
);
