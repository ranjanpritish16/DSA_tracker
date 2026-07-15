import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const qPath = path.join(repoRoot, "questionlist.txt");
const outPath = path.join(repoRoot, "lib", "data.ts");

const skipKeywords = new Set([
  "Solve",
  "Editorial",
  "PostLink",
  "YouTube",
  "Status",
  "Problem",
  "Difficulty",
  "Plus",
  "Resource",
  "Home",
  "Sheet",
  "Track",
  "Reset",
  "Import",
  "Revision",
  "Practice",
  "Note",
  "Learning",
  "Easy",
  "Medium",
  "Hard",
  "All",
]);

function isSectionHeading(line: string, nextLine: string) {
  if (!line || !nextLine) return false;
  if (!/^\d+\s*\/\s*\d+$/.test(nextLine) && !/^\d+%?$/.test(nextLine)) return false;
  if (skipKeywords.has(line)) return false;
  if (line.includes("\t")) return false;
  if (/^[-_]{2,}$/.test(line)) return false;
  if (line.length < 4 || line.length > 120) return false;
  return true;
}

const text = fs.readFileSync(qPath, "utf8");
const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const sectionHeadings = new Set<string>();
for (let i = 0; i < lines.length - 1; i += 1) {
  if (isSectionHeading(lines[i], lines[i + 1])) {
    sectionHeadings.add(lines[i]);
  }
}

const parentHeadings = new Set<string>();
for (let i = 0; i < lines.length - 2; i += 1) {
  if (isSectionHeading(lines[i], lines[i + 1])) {
    const nextLine = lines[i + 2];
    if (nextLine && sectionHeadings.has(nextLine)) {
      parentHeadings.add(lines[i]);
    }
  }
}

const DIFFICULTY_VALUES = new Set(["Easy", "Medium", "Hard"]);

let currentParent: string | null = null;
let currentSection: string | null = null;
const problems: { section: string; topic: string; name: string; difficulty: string }[] = [];

// Special handling: promote this heading to be a top-level section and
// split its problems into Easy/Medium/Hard groups by fixed offsets.
const ARRAYS_HEADING_RE = /^Solve Problems on Arrays/i;
const ARRAYS_COUNTS = { easy: 14, medium: 14, hard: 12 };
let arraysCounter = 0;
let inArraysSection = false;

function normalizeDifficulty(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "easy") return "Easy";
  if (normalized === "medium") return "Medium";
  if (normalized === "hard") return "Hard";
  return "Medium";
}

function findDifficulty(index: number) {
  for (let j = index + 1; j < Math.min(lines.length, index + 12); j += 1) {
    const candidate = lines[j].trim();
    if (sectionHeadings.has(candidate)) break;
    if (/^\d+\s*\/\s*\d+$/.test(candidate)) break;
    if (/^(All problems|Last updated|Overall Progress|Random Problem)$/i.test(candidate)) break;
    if (/^(Easy|Medium|Hard)$/i.test(candidate)) {
      return normalizeDifficulty(candidate);
    }
  }
  return "Medium";
}

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  if (sectionHeadings.has(line)) {
    // If this is the arrays heading, promote it to a parent and begin
    // assigning problems to Easy/Medium/Hard buckets based on order.
    if (ARRAYS_HEADING_RE.test(line)) {
      currentParent = line;
      currentSection = "Easy";
      arraysCounter = 0;
      inArraysSection = true;
    } else if (parentHeadings.has(line)) {
      currentParent = line;
      currentSection = null;
      inArraysSection = false;
    } else if (currentParent && !parentHeadings.has(line)) {
      currentSection = line;
      inArraysSection = false;
    }
    continue;
  }
  if (!currentSection || !currentParent) continue;
  if (skipKeywords.has(line)) continue;
  if (/^(Easy|Medium|Hard)$/i.test(line)) continue;
  if (/^\d+\s*\/\s*\d+$/.test(line)) continue; // "20 / 54"
  if (/^\d+%?$/.test(line)) continue;
  if (/^(All problems|Last updated|Overall Progress|Random Problem)$/i.test(line)) continue;
  if (line.includes("\t")) continue;
  if (/^[-_]{2,}$/.test(line)) continue;
  if (line.length < 4 || line.length > 120) continue;
  if (/^(Solve|Add Note|Practice|Plus|Resource|PostLink|YouTube)$/i.test(line)) continue;

  // For the arrays section we override topic based on the position (first
  // N problems -> Easy, next N -> Medium, remaining -> Hard). We still
  // detect difficulty for each problem (keeps fallback behavior), but
  // topic grouping is according to the sheet's requested split.
  let topicToUse = currentSection;
  if (inArraysSection) {
    arraysCounter += 1;
    if (arraysCounter <= ARRAYS_COUNTS.easy) topicToUse = "Easy";
    else if (arraysCounter <= ARRAYS_COUNTS.easy + ARRAYS_COUNTS.medium) topicToUse = "Medium";
    else topicToUse = "Hard";
  }

  const difficulty = findDifficulty(i);
  problems.push({ section: currentParent, topic: topicToUse, name: line, difficulty });
}

// Deduplicate by section+name
const seen = new Set<string>();
let unique = problems.filter((p) => {
  const k = `${p.section}||${p.name}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

// Further dedupe by name only (case-insensitive) and preserve first occurrence
const seenName = new Set<string>();
unique = unique.filter((p) => {
  const n = p.name.toLowerCase();
  if (seenName.has(n)) return false;
  seenName.add(n);
  return true;
});

// Limit to 474 problems (sheet target)
if (unique.length > 474) {
  unique = unique.slice(0, 474);
}

console.log(`Found ${unique.length} candidate problems in questionlist.txt`);

function slugify(section: string, name: string, i: number) {
  const base = `${section}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${base}-${i}`;
}

const rows = unique.map((p, i) => ({
  id: slugify(p.section, p.name, i),
  section: p.section,
  topic: p.topic,
  name: p.name,
  difficulty: p.difficulty,
}));
// Post-process: for `Bit Manipulation [Concepts & Problems]`, keep the first
// three topics as-is and move any subsequent topics to the Stack & Queues
// section (user requested). This is done dynamically to match sheet order.
const BIT_SECTION = "Bit Manipulation [Concepts & Problems]";
const STACK_SECTION = "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]";

// Collect topics in appearance order for the BIT_SECTION
const seenTopics: string[] = [];
for (const r of rows) {
  if (r.section === BIT_SECTION) {
    if (!seenTopics.includes(r.topic)) seenTopics.push(r.topic);
  }
}

const topicsToKeep = new Set(seenTopics.slice(0, 3));
for (const r of rows) {
  if (r.section === BIT_SECTION && !topicsToKeep.has(r.topic)) {
    r.section = STACK_SECTION;
  }
}

const out = `import type { Problem } from "./types";

export const PROBLEMS: Problem[] = ${JSON.stringify(rows, null, 2)};
`;

fs.writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${rows.length} problems to ${outPath}`);
