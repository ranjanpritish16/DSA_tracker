import { REVISIT_DAYS, Category } from "./types";

export function getRevisitInfo(category: Category, lastTouched: string | null) {
  if (!category || !lastTouched || category === "A") {
    return { dueDate: null as Date | null, daysLeft: null as number | null, isDue: false };
  }
  const days = REVISIT_DAYS[category];
  const last = new Date(lastTouched);
  const due = new Date(last);
  due.setDate(due.getDate() + days);
  const now = new Date();
  const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { dueDate: due, daysLeft, isDue: daysLeft <= 0 };
}
