const GUEST_LIMIT = 5;
const STORAGE_KEY = "reconciliation_attempts";

export const checkRateLimit = () => {
  const token = localStorage.getItem("auth_token");
  if (token) return false; // Logged in users have no limit

  const attempts = Number(localStorage.getItem(STORAGE_KEY) || "0");
  return attempts >= GUEST_LIMIT;
};

export const incrementAttempts = () => {
  const token = localStorage.getItem("auth_token");
  if (token) return; // Don't track attempts for logged in users

  const attempts = Number(localStorage.getItem(STORAGE_KEY) || "0");
  localStorage.setItem(STORAGE_KEY, String(attempts + 1));
};

export const resetAttempts = () => {
  localStorage.removeItem(STORAGE_KEY);
};
