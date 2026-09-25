import { Redis } from "@upstash/redis";
import { officer, sameOrigin } from "@/lib/server/auth";
import { IMAGE_SLOTS, FLYER_SLOTS, OFFICER_PHOTO_SLOTS } from "@/lib/content";
import { validImage, UPDATE_IMAGE } from "@/lib/server/images.mjs";
export const dynamic = "force-dynamic";
const reply = (body, status=200) => Response.json(body,{status,headers:{"Cache-Control":"no-store"}});
function redis() {
 const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
 const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
 if(!url || !token || !/^https:\/\//.test(url) || /[^\x21-\x7e]/.test(token)) throw new Error('IMAGE_STORAGE_CONFIGURATION');
 return new Redis({url,token});
}
function storageFailure(error) {
 const text = String(error?.message || '');
 let code = 'IMAGE_STORAGE_UNAVAILABLE';
 let message = 'Image storage could not save this change. Please check the deployment logs.';
 if(text.includes('IMAGE_STORAGE_CONFIGURATION')) {code='IMAGE_STORAGE_CONFIGURATION';message='Image storage is not configured for this Preview. Add the Redis REST URL and write token to Vercel Preview, then redeploy.';}
 else if(/unauthorized|forbidden|invalid token|WRONGPASS|NOPERM|read.?only|401|403/i.test(text)) {code='IMAGE_STORAGE_ACCESS';message='Image storage rejected its credentials or write permission. Check the Redis write token in Vercel Preview.';}
 else if(/max.*size|too large|limit|quota/i.test(text)) {code='IMAGE_STORAGE_LIMIT';message='The image storage service reached a size or usage limit. Check the Redis dashboard.';}
 console.error('Image storage operation failed', {code});
 return reply({error:message,code},503);
}
export async function GET(request) {
 const key = new URL(request.url).searchParams.get('key');
 if(!['events','siteImages'].includes(key)) return reply({error:'Not found'},404);
 try {const value=await redis().get(`colorstackuta:${key}`);return value==null ? reply({error:'Not found'},404) : reply({key,value});} catch(error) {return storageFailure(error);}
}
export async function POST(request) {
 if(!sameOrigin(request)) return reply({error:'The upload origin was rejected. Reopen this Preview directly and try again.',code:'UPLOAD_ORIGIN'},403);
 try {if(!await officer()) return reply({error:'Officer access is required. Sign in with your approved account.',code:'OFFICER_REQUIRED'},403);} catch {return reply({error:'Unable to verify your officer account. Sign in again.',code:'OFFICER_VERIFICATION'},503);}
 let body;
 try {
 if(Number(request.headers.get('content-length'))>2_100_000) return reply({error:'This image is too large. Choose an image under 1.4 MB.'},413);
 const raw=await request.text();if(raw.length>2_100_000) return reply({error:'This image is too large. Choose an image under 1.4 MB.'},413);
 body=JSON.parse(raw);
 } catch {return reply({error:'The upload request was invalid.'},400);}
 const slots=new Set([...IMAGE_SLOTS,...FLYER_SLOTS,...OFFICER_PHOTO_SLOTS].map(s=>s.id));
 if(body.key!=='siteImages' || !slots.has(body.slotId)) return reply({error:'Unknown photo slot. Refresh the admin page before trying again.'},400);
 if(body.image!==null && !validImage(body.image)) return reply({error:'Choose a valid JPG, PNG, or WebP image under 1.4 MB.'},400);
 try {await redis().eval(UPDATE_IMAGE,['colorstackuta:siteImages'],[body.slotId,body.image===null?'':body.image]);return reply({ok:true,slotId:body.slotId});} catch(error) {return storageFailure(error);}
}
export async function DELETE() {return reply({error:'Method not allowed'},405);}
