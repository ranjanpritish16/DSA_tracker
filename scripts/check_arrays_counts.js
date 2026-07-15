const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'lib', 'data.ts');
const text = fs.readFileSync(p, 'utf8');
const m = text.match(/export\s+const\s+PROBLEMS[^=]*=\s*([\s\S]*?)\n\s*;?\s*$/m);
if (!m) {
  console.error('PROBLEMS array not found');
  process.exit(1);
}
const arrText = m[1];
let rows;
try {
  // eval inside parens to allow top-level array literal
  rows = eval('(' + arrText + ')');
} catch (e) {
  try {
    rows = JSON.parse(arrText);
  } catch (e2) {
    console.error('Failed to parse PROBLEMS array:', e.message, e2 && e2.message);
    process.exit(2);
  }
}
const section = 'Solve Problems on Arrays [Easy -> Medium -> Hard]';
const filtered = rows.filter(r => r.section === section);
const counts = filtered.reduce((acc, r) => { acc[r.topic] = (acc[r.topic] || 0) + 1; return acc; }, {});
console.log('total in arrays section:', filtered.length);
console.log('counts by topic:', counts);
console.log('first 3:', filtered.slice(0,3).map(r=>r.name));
console.log('last 3:', filtered.slice(-3).map(r=>r.name));
