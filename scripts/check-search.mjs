import assert from 'node:assert/strict';
import { matchesQuery, searchExcerpt } from '../lib/note-search.mjs';
assert(matchesQuery('Docker 容器 Linux', 'docker linux'));
assert(matchesQuery('C++11 移动语义', 'Ｃ＋＋１１'));
assert(matchesQuery('前向传播 反向传播', '反向传播'));
assert(matchesQuery('anything', '   '));
assert(!matchesQuery('Docker 容器', 'docker missing'));
assert.equal(searchExcerpt('正文内容', 'missing'), '');
assert(
  searchExcerpt('前文 '.repeat(60) + 'std::mutex 用法', 'mutex').includes(
    'std::mutex',
  ),
);
assert(
  searchExcerpt('前文 '.repeat(60) + 'std::mutex 用法', 'mutex').startsWith(
    '…',
  ),
);
console.log(
  'Search checks passed: full text, multiple terms, case, full-width characters and excerpts.',
);
