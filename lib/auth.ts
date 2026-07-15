import { prisma } from "@/lib/prisma";

export async function getOrCreateUser(githubId: string, username: string, name?: string, image?: string) {
  return prisma.user.upsert({
    where: { githubId },
    update: { username, name, image },
    create: { githubId, username, name, image },
  });
}
