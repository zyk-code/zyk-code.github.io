/** @param {string} text @param {string} query */
export function matchesQuery(text, query) {
  const haystack = text.normalize('NFKC').toLowerCase();
  return query
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/** @param {string} text @param {string} query */
export function searchExcerpt(text, query) {
  const normalized = text.normalize('NFKC');
  const terms = query
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const positions = terms
    .map((term) => normalized.toLowerCase().indexOf(term))
    .filter((position) => position >= 0);
  if (!positions.length) return '';
  const start = Math.max(0, Math.min(...positions) - 25);
  const end = Math.min(normalized.length, start + 130);
  return (
    (start ? '…' : '') +
    normalized.slice(start, end) +
    (end < normalized.length ? '…' : '')
  );
}
