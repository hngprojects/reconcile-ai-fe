const GUEST_LIMIT = 5;
const STORAGE_KEY = "reconciliation_attempts";

export const checkRateLimit = () => {
  const attempts = Number(localStorage.getItem(STORAGE_KEY) || "0");
  return attempts >= GUEST_LIMIT;
};

export const incrementAttempts = () => {
  const attempts = Number(localStorage.getItem(STORAGE_KEY) || "0");
  localStorage.setItem(STORAGE_KEY, String(attempts + 1));
};

export const resetAttempts = () => {
  localStorage.removeItem(STORAGE_KEY);
};
