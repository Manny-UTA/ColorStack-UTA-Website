// ---------------------------------------------------------------------------
// TEMPORARY local storage shim.
//
// This mirrors the tiny key/value API used throughout the site so it can
// run entirely client-side for now (no backend required to deploy and test).
// It is NOT shared across visitors — each person's browser has its own copy,
// and it is NOT secure or durable (clearing browser data wipes it).
//
// Before this goes live for real members:
//   - Replace this file's internals with calls to a real database
//     (Supabase or MongoDB Atlas both have free tiers, both in the
//     GitHub Student Developer Pack).
//   - Replace the officer passcode in ColorStackUTA.jsx with real
//     authentication (Clerk, also free in the Student Pack).
//
// Every place that calls `storage.get/set/delete` in ColorStackUTA.jsx
// can stay exactly as written — only this file needs to change.
// ---------------------------------------------------------------------------

export const storage = {
  async get(key) {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      throw new Error(`Key "${key}" not found`);
    }
    return { key, value: raw };
  },

  async set(key, value) {
    if (typeof window === "undefined") return null;
    window.localStorage.setItem(key, value);
    return { key, value };
  },

  async delete(key) {
    if (typeof window === "undefined") return null;
    window.localStorage.removeItem(key);
    return { key, deleted: true };
  },
};
