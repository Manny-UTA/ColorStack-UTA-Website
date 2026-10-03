import 'server-only';
import {Redis} from '@upstash/redis';
import {createHash} from 'node:crypto';
import {validateOffer} from '../offers.mjs';
const key=()=>`colorstackuta:offers:${process.env.VERCEL_ENV==='production'?'production':'preview'}:v1`;
function db(){return new Redis({url:process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,token:process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN});}
export async function offers(){const values=await db().hgetall(key());return Object.values(values||{}).map(v=>typeof v==='string'?JSON.parse(v):v);}
export async function submitOffer(user,body){const data=validateOffer(body);const id=createHash('sha256').update(JSON.stringify([user.id,data.company.toLowerCase(),data.role.toLowerCase(),data.type,data.date])).digest('hex');const row={...data,id,userId:user.id,name:[user.firstName,user.lastName].filter(Boolean).join(' ')||'Member',status:'pending',addToBaseline:false,submittedAt:new Date().toISOString()};await db().hsetnx(key(),id,JSON.stringify(row));return id;}
export async function reviewOffer(user,body){if(!/^[a-f0-9]{64}$/.test(body.id||'')||!['approved','rejected','pending'].includes(body.status)||typeof body.addToBaseline!=='boolean')throw Error('Choose a valid review decision.');const redis=db();let row=await redis.hget(key(),body.id);if(!row)throw Error('Report not found.');if(typeof row==='string')row=JSON.parse(row);if(row.userId===user.id)throw Error('Another officer must review your own offer.');await redis.hset(key(),{[body.id]:JSON.stringify({...row,status:body.status,addToBaseline:body.status==='approved'&&body.addToBaseline,reviewedBy:user.id,reviewedAt:new Date().toISOString()})});}
