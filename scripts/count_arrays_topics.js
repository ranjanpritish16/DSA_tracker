const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'lib', 'data.ts');
const text = fs.readFileSync(p, 'utf8');
const marker = 'export const PROBLEMS';
const m = text.indexOf(marker);
if (m === -1) { console.error('marker not found'); process.exit(1); }
const start = text.indexOf('[', m);
if (start === -1) { console.error('array start not found'); process.exit(1); }
let i = start; let depth = 0; let end = -1;
for (; i < text.length; i++) {
  const ch = text[i];
  if (ch === '[') depth++;
  else if (ch === ']') { depth--; if (depth === 0) { end = i; break; } }
}
if (end === -1) { console.error('matching ] not found'); process.exit(1); }
const body = text.slice(start, end+1);
let rows;
try { rows = JSON.parse(body); } catch (e) { console.error('JSON parse failed:', e.message); process.exit(2); }
// Show sections and look for arrays-like section names
const sections = Array.from(new Set(rows.map(r => r.section)));
console.log('total unique sections:', sections.length);
console.log('sections containing Array(s):', sections.filter(s => /Array/i.test(s)));
// Print counts for the exact arrays section if present
const section = 'Solve Problems on Arrays [Easy -> Medium -> Hard]';
if (sections.includes(section)) {
  const filtered = rows.filter(r => r.section === section);
  const counts = filtered.reduce((acc, r) => { acc[r.topic] = (acc[r.topic]||0)+1; return acc; }, {});
  console.log('total in arrays section:', filtered.length);
  console.log('counts by topic:', counts);
} else {
  console.log('Exact arrays section not found. Available similar sections printed above.');
}
process.exit(0);
