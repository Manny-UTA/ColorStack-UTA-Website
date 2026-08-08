import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// This route is the ONLY place that talks to the database. Credentials for
// Upstash Redis live in server-side environment variables (auto-injected by
// Vercel once a Redis store is added from the Marketplace and linked to
// this project) and are never exposed to the browser.
//
// Every key is namespaced under "colorstackuta:" so this store can be
// safely shared with other data later without collisions.
// ---------------------------------------------------------------------------

export const dynamic = "force-dynamic";

const NAMESPACE = "colorstackuta";

function namespacedKey(key) {
  return `${NAMESPACE}:${key}`;
}

function getRedis() {
  return Redis.fromEnv();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  try {
    const redis = getRedis();
    const value = await redis.get(namespacedKey(key));
    if (value === null || value === undefined) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ key, value });
  } catch (err) {
    return NextResponse.json({ error: "Storage read failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { key, value } = body;
    if (!key || value === undefined) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
    }
    const redis = getRedis();
    await redis.set(namespacedKey(key), value);
    return NextResponse.json({ key, value });
  } catch (err) {
    return NextResponse.json({ error: "Storage write failed" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  try {
    const redis = getRedis();
    await redis.del(namespacedKey(key));
    return NextResponse.json({ key, deleted: true });
  } catch (err) {
    return NextResponse.json({ error: "Storage delete failed" }, { status: 500 });
  }
}
