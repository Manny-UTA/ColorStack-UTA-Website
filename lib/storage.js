// ---------------------------------------------------------------------------
// Shared storage client. Same get/set/delete shape as before, but now every
// visitor and officer reads and writes the same data — calls go through
// /api/storage, which is the only place that touches the actual database
// (Vercel KV). No credentials live in this file or anywhere in the browser.
//
// Setup required once, in the Vercel dashboard:
//   1. Project → Storage tab → Create Database → KV
//   2. Connect it to this project (env vars get added automatically)
//   3. Redeploy
// Until that's done, these calls will fail — every function below throws
// a clear error in that case rather than failing silently.
// ---------------------------------------------------------------------------

export const storage = {
  async get(key) {
    const res = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      throw new Error(`Key "${key}" not found`);
    }
    if (!res.ok) {
      throw new Error(`Storage read failed for "${key}"`);
    }
    return res.json(); // { key, value }
  },

  async set(key, value) {
    const res = await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok) {
      throw new Error(`Storage write failed for "${key}"`);
    }
    return res.json(); // { key, value }
  },

  async delete(key) {
    const res = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Storage delete failed for "${key}"`);
    }
    return res.json(); // { key, deleted }
  },
};
