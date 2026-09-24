import { Redis } from "@upstash/redis";
import { officer, sameOrigin } from "@/lib/server/auth";
import { IMAGE_SLOTS, FLYER_SLOTS, OFFICER_PHOTO_SLOTS, MAX_IMAGE_BYTES } from "@/lib/content";
export const dynamic = "force-dynamic";
const reply = (body, status=200) => Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
const redis = () => new Redis({url:process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,token:process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN});
export async function GET(request) {
 const key = new URL(request.url).searchParams.get("key");
 if(!["events","siteImages"].includes(key)) return reply({error:"Not found"},404);
 try { const value = await redis().get(`colorstackuta:${key}`); return value == null ? reply({error:"Not found"},404) : reply({key,value}); } catch {return reply({error:"Storage unavailable"},503);}
}
export async function POST(request) {
 if(!sameOrigin(request)) return reply({error:"Forbidden"},403);
 try {
 if(!await officer()) return reply({error:"Officer approval required"},403);
 const raw = await request.text();
 if(raw.length > 4_000_000) return reply({error:"Upload too large"},413);
 const {key,value} = JSON.parse(raw);
 if(key !== "siteImages") return reply({error:"Not found"},404);
 const images = typeof value === "string" ? JSON.parse(value) : value;
 const slots = new Set([...IMAGE_SLOTS,...FLYER_SLOTS,...OFFICER_PHOTO_SLOTS].map(s=>s.id));
 if(!images || typeof images !== "object" || Array.isArray(images)) return reply({error:"Invalid images"},400);
 for(const [slot,image] of Object.entries(images)) {
 if(!slots.has(slot) || typeof image !== "string" || image.length > Math.ceil(MAX_IMAGE_BYTES*4/3)+100 || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+=*$/.test(image)) return reply({error:"Invalid image"},400);
 }
 await redis().set("colorstackuta:siteImages",JSON.stringify(images));
 return reply({key,value:JSON.stringify(images)});
 } catch {return reply({error:"Unable to save images"},503);}
}
export async function DELETE() { return reply({error:"Method not allowed"},405); }
