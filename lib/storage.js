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
    return res.json();
  },

  async set(key, value) {
    const res = await fetch("/api/storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Storage write failed for "${key}"`);
    }
    return res.json();
  },

  async delete(key) {
    const res = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Storage delete failed for "${key}"`);
    }
    return res.json();
  },
};
