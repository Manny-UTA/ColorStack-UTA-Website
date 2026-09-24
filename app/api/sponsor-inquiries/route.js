import { Redis } from "@upstash/redis";
import { createHash, randomUUID } from "node:crypto";
export async function POST(request) {
 if(request.headers.get("origin") !== new URL(request.url).origin) return Response.json({error:"Forbidden"},{status:403});
 try {
 const raw = await request.text(); if(raw.length > 8000) return Response.json({error:"Message too long"},{status:413});
 const data = JSON.parse(raw); const fields = {};
 for(const [key,max] of Object.entries({company:200,name:150,email:254,message:4000})) {
 if(typeof data[key] !== "string" || data[key].length>max || (key!=="message" && !data[key].trim())) return Response.json({error:"Invalid form"},{status:400});
 fields[key]=data[key].trim();
 }
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return Response.json({error:"Invalid email"},{status:400});
 const redis = new Redis({url:process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,token:process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN});
 const limit = createHash("sha256").update(fields.email.toLowerCase()).digest("hex");
 if(!await redis.set(`colorstackuta:inquiry-limit:${limit}`,1,{nx:true,ex:60})) return Response.json({error:"Please wait a minute before submitting again"},{status:429});
 await redis.hset("colorstackuta:sponsorInquiries",{[randomUUID()]:JSON.stringify({...fields,submittedAt:new Date().toISOString()})});
 return Response.json({ok:true});
 } catch {return Response.json({error:"Unable to save inquiry"},{status:503});}
}
