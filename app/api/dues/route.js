import {identity,sameOrigin} from '@/lib/server/auth';
import {duesStatus,checkout} from '@/lib/server/dues';
import {ProfileError} from '@/lib/profile-fields.mjs';
export const dynamic='force-dynamic';
export const maxDuration=60;
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
function failure(e){if(e instanceof ProfileError)return reply({error:e.message},e.status);console.error('Dues request failed',{code:'DUES_UNEXPECTED'});return reply({error:'Dues could not be confirmed. Retry, or contact an officer if you already paid.'},503);}
export async function GET(){try{const user=await identity();if(!user)return reply({error:'Please sign in.'},401);return reply(await duesStatus(user));}catch(e){return failure(e);}}
export async function POST(request){
 if(!sameOrigin(request))return reply({error:'Open the Portal directly to continue.'},403);
 try{const user=await identity();if(!user)return reply({error:'Please sign in.'},401);const raw=await request.text();if(raw.length>100)return reply({error:'Invalid checkout request.'},400);let data;try{data=JSON.parse(raw);}catch{return reply({error:'Invalid checkout request.'},400);}if(!data||typeof data!=='object'||Object.keys(data).some(k=>k!=='plan'))return reply({error:'Invalid checkout request.'},400);return reply(await checkout(user,data.plan,new URL(request.url).origin));}catch(e){return failure(e);}
}
