import {identity,sameOrigin} from '@/lib/server/auth';
import {validateProfile,ProfileError} from '@/lib/profile-fields.mjs';
import {loadRecords,displayProfile,saveProfile} from '@/lib/server/profiles';
export const dynamic='force-dynamic';
export const maxDuration=60;
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
function failure(error){if(error instanceof ProfileError)return reply({error:error.message,code:error.code},error.status);console.error('Profile request failed',{code:'PROFILE_UNEXPECTED'});return reply({error:'Your profile could not be loaded or saved. Please retry.'},503);}
export async function GET(){try{const user=await identity();if(!user)return reply({error:'Please sign in with a verified email.'},401);return reply(displayProfile(await loadRecords(user),user));}catch(error){return failure(error);}}
export async function POST(request){
 if(!sameOrigin(request))return reply({error:'This save was rejected. Open the Preview directly and try again.'},403);
 try{const user=await identity();if(!user)return reply({error:'Please sign in with a verified email.'},401);
 const raw=await request.text();if(raw.length>12000)return reply({error:'Profile is too long.'},413);
 let data;try{data=JSON.parse(raw);}catch{return reply({error:'Invalid profile request.'},400);}
 return reply(await saveProfile(user,validateProfile(data)));
 }catch(error){return failure(error);}
}
