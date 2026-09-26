import 'server-only';
import {Redis} from '@upstash/redis';
import {randomUUID} from 'node:crypto';
import {verifiedEmail} from './access.mjs';
import {ProfileError,assertOwned,memberFields,EMPTY_PROFILE,CONSENT_VERSION,CONSENT_TEXT} from '../profile-fields.mjs';
export const TABLES={members:'tbloaIIG7nJCwYOUN',resumes:'tblFiabT1ZnbKSQcn',demographics:'tblApoBcKMD87qMtP'};
const TEST_BASE='apppmStwT2Y3uhD99';
export function config() {
 if(process.env.VERCEL_ENV==='production'||process.env.AIRTABLE_BASE_ID!==TEST_BASE) throw new ProfileError('Profile registration is currently available only on the configured test Preview.',503,'PROFILE_CONFIGURATION');
 const token=process.env.AIRTABLE_ACCESS_TOKEN;
 if(!token||/[^\x21-\x7e]/.test(token))throw new ProfileError('Airtable access is not configured for this Preview.',503,'PROFILE_CONFIGURATION');
 return {base:TEST_BASE,token};
}
function profileRedis() {
 const url=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN;
 if(!url||!token)throw new ProfileError('Profile saving needs the Preview Redis connection configured.',503,'PROFILE_LOCK_CONFIGURATION');
 return new Redis({url,token});
}
async function paceAirtable() {
 // Reserve evenly spaced calls across all server instances sharing this base.
 const script="local t=redis.call('TIME');local now=t[1]*1000+math.floor(t[2]/1000);local next=tonumber(redis.call('GET',KEYS[1]) or '0');local slot=math.max(now,next);if slot-now>4000 then return -1 end;redis.call('SET',KEYS[1],slot+300,'PX',10000);return slot-now";
 let wait;try{wait=await profileRedis().eval(script,[`colorstackuta:airtable-pace:${TEST_BASE}`],[]);}catch{throw new ProfileError('The profile service is temporarily unavailable.',503,'PROFILE_PACING');}
 if(wait<0)throw new ProfileError('Registration is busy. Wait a few seconds and try again.',429,'PROFILE_BUSY');
 if(wait>0)await new Promise(resolve=>setTimeout(resolve,wait));
}
export async function api(path,options={},content=false) {
 const {base,token}=config();
 await paceAirtable();
 const url=content ? `https://content.airtable.com/v0/${base}/${path}` : `https://api.airtable.com/v0/${base}/${path}`;
 let res;try {res=await fetch(url,{...options,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},cache:'no-store',signal:AbortSignal.timeout(12000)});} catch {throw new ProfileError('Airtable did not respond. Your save may be incomplete; retry to finish it.',503,'AIRTABLE_UNAVAILABLE');}
 if(!res.ok) {const detail=await res.json().catch(()=>({}));const type=detail.error?.type||'UNKNOWN';console.error('Profile Airtable request failed',{status:res.status,type,table:path.split('/')[0].split('?')[0]});
 throw new ProfileError(res.status===429?'Airtable is busy. Wait 30 seconds and try again.':res.status===401||res.status===403?'Airtable denied access. The chapter administrator needs to check this Preview’s token and base permissions.':res.status===422?'An Airtable field needs configuration. Your save may be incomplete; contact a chapter officer.':'Your save could not finish. Please retry.',res.status===429?429:503,'AIRTABLE_'+type);}
 return res.json();
}
export const quote=s=>`'${String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}'`;
export async function find(table,userId) {
 const q=new URLSearchParams({filterByFormula:`{Clerk User ID}=${quote(userId)}`,maxRecords:'2'});
 const data=await api(`${table}?${q}`);if(data.records.length>1)throw new ProfileError('Duplicate account links need an officer review.',409,'PROFILE_DUPLICATE');
 return assertOwned(data.records[0]||null,userId);
}
export async function loadRecords(user) {
 config();const member=await find(TABLES.members,user.id);
 if(!member)return {member:null,resume:null,demographics:null};
 const resume=assertOwned(await find(TABLES.resumes,user.id),user.id,member.id);
 const demographics=assertOwned(await find(TABLES.demographics,user.id),user.id,member.id);
 return {member,resume,demographics};
}
export function displayProfile(records,user) {
 const m=records.member?.fields||{},r=records.resume?.fields||{},d=records.demographics?.fields||{};
 const files=r['Resume File']||[];const file=files.at(-1);
 return {exists:Boolean(records.member),profile:{...EMPTY_PROFILE,name:m.Name||[user.firstName,user.lastName].filter(Boolean).join(' '),major:m.Major||'',graduationMonth:(r['Graduation Month/Year']||'').split(' ')[0],graduationYear:m['Graduation Year']||'',standing:m['Academic Standing']||'',linkedin:m['LinkedIn URL']||'',portfolio:m['Portfolio URL']||'',interests:(r['Career Interests']||'').split(', ').filter(Boolean),locations:r['Preferred Work Locations']||'',ethnicity:d['Race/Ethnicity']||[],gender:d.Gender||'',lgbtq:d['LGBTQ+ Identity']||'',international:d['International Student Status']||'',shareResume:Boolean(r['Explicit Resume Sharing Consent']&&r['Resume Book Opt-in'])},resume:file?{name:file.filename,size:file.size}:null};
}
export async function upsert(table,fields) {
 const data=await api(table,{method:'PATCH',body:JSON.stringify({performUpsert:{fieldsToMergeOn:['Clerk User ID']},typecast:true,records:[{fields}]})});return data.records[0];
}
export async function patch(table,id,fields) {return api(`${table}/${id}`,{method:'PATCH',body:JSON.stringify({fields})});}
export async function withProfileLock(userId,fn) {
 config();const url=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN;
 if(!url||!token)throw new ProfileError('Profile saving needs the Preview Redis connection configured.',503,'PROFILE_LOCK_CONFIGURATION');
 const redis=new Redis({url,token});const key=`colorstackuta:profile-lock:${TEST_BASE}:${userId}`,nonce=randomUUID();
 let locked;try{locked=await redis.set(key,nonce,{nx:true,ex:120});}catch{throw new ProfileError('The profile save service is unavailable. Please retry later.',503,'PROFILE_LOCK_UNAVAILABLE');}
 if(!locked)throw new ProfileError('Another save is still finishing. Please wait before trying again.',409,'PROFILE_BUSY');
 try{return await fn();}finally {await redis.eval("if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",[key],[nonce]).catch(()=>{});}
}
export function consentFields(allowed,now=new Date().toISOString()) {return {'Resume Book Opt-in':allowed,'Explicit Resume Sharing Consent':allowed,'Withdrawn Opt-in Timestamp':allowed?null:now,'Consent Record':JSON.stringify({version:CONSENT_VERSION,allowed,recordedAt:now,text:CONSENT_TEXT})};}
export async function saveProfile(user,profile) {
 return withProfileLock(user.id,async()=>{
 const previous=await loadRecords(user);const email=verifiedEmail(user);
 if(!previous.member) {
 const q=new URLSearchParams({filterByFormula:`LOWER({Email})=${quote(email)}`,maxRecords:'1'});const old=await api(`${TABLES.members}?${q}`);
 if(old.records.length)throw new ProfileError('A member record already uses this email. Ask an officer to link it to your account before saving.',409,'PROFILE_LINK_REQUIRED');
 }
 if(profile.shareResume&&!previous.resume?.fields?.['Resume File']?.length)throw new ProfileError('Save your profile, upload a resume, then enable resume sharing.');
 const member=await upsert(TABLES.members,memberFields(profile,user.id,email));
 const resume=await upsert(TABLES.resumes,{'Clerk User ID':user.id,Member:[member.id],'Graduation Month/Year':`${profile.graduationMonth} ${profile.graduationYear}`,'Career Interests':profile.interests.join(', '),'Preferred Work Locations':profile.locations,...consentFields(profile.shareResume)});
 const hasDemographics=profile.ethnicity.length||profile.gender||profile.lgbtq||profile.international;
 let demographics=previous.demographics;
 if(hasDemographics||demographics)demographics=await upsert(TABLES.demographics,{'Clerk User ID':user.id,Member:[member.id],'Race/Ethnicity':profile.ethnicity,Gender:profile.gender||null,'LGBTQ+ Identity':profile.lgbtq||null,'International Student Status':profile.international||null,'Submission Date':new Date().toISOString()});
 return displayProfile({member,resume,demographics},user);
 });
}
