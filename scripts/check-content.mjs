import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'zyk-content-'));
const builder = path.resolve('scripts/build-content.mjs');
const writeCatalog = (entries) =>
  fs.writeFileSync(
    path.join(fixture, 'data/catalog.json'),
    JSON.stringify(entries),
  );
const build = () =>
  spawnSync(process.execPath, [builder, fixture], { encoding: 'utf8' });
try {
  fs.mkdirSync(path.join(fixture, 'data'));
  fs.mkdirSync(path.join(fixture, 'public/note'), { recursive: true });
  fs.writeFileSync(
    path.join(fixture, 'public/note/diagram.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg"/>',
  );
  fs.writeFileSync(
    path.join(fixture, 'data/topics.json'),
    JSON.stringify([{ id: 'cpp', title: 'C++' }]),
  );
  const catalog = Array.from({ length: 33 }, (_, i) => ({
    category: 'cpp',
    slug: `note-${i}`,
    file: `note-${i}.md`,
    title: `Note ${i}`,
    summary: 'Regression fixture',
  }));
  for (const item of catalog)
    fs.writeFileSync(
      path.join(fixture, item.file),
      '# Heading\n\n## Repeat\n\n$x^2$\n\n## Repeat\n\n![Diagram](/note/diagram.svg)\n\n<script>alert(1)</script>\n\n```mermaid\nflowchart LR\n  start --> main --> exit\n```',
    );
  writeCatalog(catalog);
  let result = build();
  assert.equal(result.status, 0, result.stderr);
  const articles = JSON.parse(
    fs.readFileSync(path.join(fixture, 'data/articles.json'), 'utf8'),
  );
  assert.equal(articles.length, 33, 'Adding a 33rd article must succeed');
  const searchIndex = JSON.parse(
    fs.readFileSync(path.join(fixture, 'data/search-index.json'), 'utf8'),
  );
  assert.equal(searchIndex.length, 33, 'New articles must be searchable');
  assert(
    searchIndex[0].searchText.includes('start --> main --> exit'),
    'Search must include code',
  );
  assert(
    !Object.hasOwn(searchIndex[0], 'html'),
    'The search index must not bundle rendered HTML',
  );
  assert.equal(
    new Set(articles[0].toc.map((h) => h.id)).size,
    2,
    'Repeated headings need distinct anchors',
  );
  assert(articles[0].html.includes('<svg'), 'Math must render');
  assert(
    articles[0].html.includes('program-flow'),
    'Existing flow diagram must render',
  );
  assert(
    !articles[0].html.includes('<script>'),
    'Markdown must not inject scripts',
  );
  writeCatalog([...catalog, catalog[0]]);
  result = build();
  assert.notEqual(result.status, 0, 'Duplicate URLs must fail');
  assert(result.stderr.includes('Duplicate article slug'));
  writeCatalog([{ ...catalog[0], category: 'missing' }]);
  result = build();
  assert.notEqual(result.status, 0, 'Unknown categories must fail');
  assert(result.stderr.includes('Unknown article category'));
  writeCatalog([{ ...catalog[0], file: '../outside.md' }]);
  result = build();
  assert.notEqual(
    result.status,
    0,
    'Source paths must stay inside the project',
  );
  assert(result.stderr.includes('Invalid article source path'));
  writeCatalog([catalog[0]]);
  fs.writeFileSync(
    path.join(fixture, catalog[0].file),
    '![Missing](/note/missing.png)',
  );
  result = build();
  assert.notEqual(result.status, 0, 'Missing images must fail');
  assert(result.stderr.includes('Missing image'));
  console.log(
    'Content regression checks passed: new notes, anchors, math, diagram, script escaping and invalid inputs.',
  );
} finally {
  const actual = fs.realpathSync(fixture);
  assert(
    actual.startsWith(fs.realpathSync(os.tmpdir()) + path.sep + 'zyk-content-'),
  );
  fs.rmSync(actual, { recursive: true, force: true });
}
