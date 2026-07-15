const STORAGE_USER_KEY = "dsa-tracker:user-id";

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateLocalUserId(): string {
  if (typeof window === "undefined") return "";
  let userId = window.localStorage.getItem(STORAGE_USER_KEY);
  if (!userId) {
    userId = generateId();
    window.localStorage.setItem(STORAGE_USER_KEY, userId);
  }
  return userId;
}

export function getProgressHeaders(): HeadersInit {
  const userId = getOrCreateLocalUserId();
  return { "x-user-id": userId };
}
