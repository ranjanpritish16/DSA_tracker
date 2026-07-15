import { PrismaClient } from "@prisma/client";
import { PROBLEMS } from "../lib/data.ts";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${PROBLEMS.length} problems...`);

  for (let i = 0; i < PROBLEMS.length; i++) {
    const p = PROBLEMS[i];
    await prisma.problem.upsert({
      where: { id: p.id },
      update: {
        section: p.section,
        topic: p.topic,
        name: p.name,
        difficulty: p.difficulty,
        leetcodeUrl: p.leetcodeUrl ?? null,
        gfgUrl: p.gfgUrl ?? null,
        orderIndex: i,
      },
      create: {
        id: p.id,
        section: p.section,
        topic: p.topic,
        name: p.name,
        difficulty: p.difficulty,
        leetcodeUrl: p.leetcodeUrl ?? null,
        gfgUrl: p.gfgUrl ?? null,
        orderIndex: i,
      },
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
