import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 401 });
  }

  const entries = await prisma.progressEntry.findMany({
    where: { userId },
    select: {
      problemId: true,
      category: true,
      solved: true,
      withHint: true,
      notes: true,
      lastTouched: true,
    },
  });

  const payload = entries.reduce((acc, entry) => {
    acc[entry.problemId] = {
      category: entry.category,
      solved: entry.solved,
      withHint: entry.withHint,
      notes: entry.notes ?? "",
      lastTouched: entry.lastTouched?.toISOString() ?? null,
    };
    return acc;
  }, {} as Record<string, any>);

  return NextResponse.json(payload);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 401 });
  }

  const payload = await request.json();
  const { problemId, category, solved, withHint, notes } = payload;
  if (!problemId) {
    return NextResponse.json({ error: "Missing problemId" }, { status: 400 });
  }

  const lastTouched = new Date();

  const entry = await prisma.progressEntry.upsert({
    where: { userId_problemId: { userId, problemId } },
    update: {
      category,
      solved,
      withHint,
      notes,
      lastTouched,
    },
    create: {
      userId,
      problemId,
      category,
      solved,
      withHint,
      notes,
      lastTouched,
    },
  });

  await prisma.solveEvent.create({
    data: {
      userId,
      problemId,
      category,
    },
  });

  return NextResponse.json({ success: true, entry });
}
