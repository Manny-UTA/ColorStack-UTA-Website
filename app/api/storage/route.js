import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NAMESPACE = "colorstackuta";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

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
    return NextResponse.json({ error: "Missing key" }, { status: 400, headers: NO_STORE_HEADERS });
  }
  try {
    const redis = getRedis();
    const value = await redis.get(namespacedKey(key));
    if (value === null || value === undefined) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE_HEADERS });
    }
    return NextResponse.json({ key, value }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ error: "Storage read failed" }, { status: 500, headers: NO_STORE_HEADERS });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { key, value } = body;
    if (!key || value === undefined) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400, headers: NO_STORE_HEADERS });
    }
    const redis = getRedis();
    await redis.set(namespacedKey(key), value);
    return NextResponse.json({ key, value }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ error: "Storage write failed" }, { status: 500, headers: NO_STORE_HEADERS });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400, headers: NO_STORE_HEADERS });
  }
  try {
    const redis = getRedis();
    await redis.del(namespacedKey(key));
    return NextResponse.json({ key, deleted: true }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    return NextResponse.json({ error: "Storage delete failed" }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
