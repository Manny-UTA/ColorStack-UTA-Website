import {randomUUID} from 'node:crypto';
import {identity,sameOrigin} from '@/lib/server/auth';
import {ProfileError} from '@/lib/profile-fields.mjs';
import {api,loadRecords,displayProfile,withProfileLock,patch,TABLES,consentFields} from '@/lib/server/profiles';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export const maxDuration=60;
const MAX=3*1024*1024;
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
function failure(e){if(e instanceof ProfileError)return reply({error:e.message,code:e.code},e.status);console.error('Resume operation failed',{code:'RESUME_UNEXPECTED'});return reply({error:'The resume operation could not finish. Refresh your profile before retrying.'},503);}
function requireResumeRecord(records){if(!records.member||!records.resume)throw new ProfileError('Save your profile before uploading a resume.');}
export async function POST(request){
 if(!sameOrigin(request))return reply({error:'Upload origin rejected.'},403);
 try{const user=await identity();if(!user)return reply({error:'Please sign in with a verified email.'},401);
 if(Number(request.headers.get('content-length'))>MAX+16384)return reply({error:'Choose a PDF under 3 MB.'},413);
 const data=await request.formData();const file=data.get('resume');
 if(!file||typeof file.arrayBuffer!=='function'||file.size>MAX||file.size<10||!file.name?.toLowerCase().endsWith('.pdf'))return reply({error:'Choose a PDF under 3 MB.'},400);
 const bytes=Buffer.from(await file.arrayBuffer());
 if(!bytes.subarray(0,5).equals(Buffer.from('%PDF-'))||!bytes.subarray(-2048).includes(Buffer.from('%%EOF')))return reply({error:'This file does not appear to be a complete PDF. Export your resume as PDF and retry.'},400);
 return reply(await withProfileLock(user.id,async()=>{
 const records=await loadRecords(user);requireResumeRecord(records);
 // Replacing a resume withdraws the previous sharing consent before upload.
 await patch(TABLES.resumes,records.resume.id,consentFields(false));
 const name=`resume-${randomUUID()}.pdf`;
 const uploaded=await api(`${records.resume.id}/${encodeURIComponent('Resume File')}/uploadAttachment`,{method:'POST',body:JSON.stringify({contentType:'application/pdf',file:bytes.toString('base64'),filename:name})},true);
 const attachments=Object.values(uploaded.fields||{}).filter(Array.isArray).flat();const attachment=attachments.find(a=>a?.filename===name&&a.id);
 if(!attachment)throw new ProfileError('The upload response was incomplete. Refresh your profile before retrying.',503);
 const resume=await patch(TABLES.resumes,records.resume.id,{'Resume File':[{id:attachment.id}],'Upload Date':new Date().toISOString(),'Resume Updated Date':new Date().toISOString().slice(0,10)});
 return displayProfile({...records,resume},user);
 }));
 }catch(e){return failure(e);}
}
export async function DELETE(request){
 if(!sameOrigin(request))return reply({error:'Request origin rejected.'},403);
 try{const user=await identity();if(!user)return reply({error:'Please sign in.'},401);
 return reply(await withProfileLock(user.id,async()=>{const records=await loadRecords(user);requireResumeRecord(records);const resume=await patch(TABLES.resumes,records.resume.id,{'Resume File':[],...consentFields(false)});return displayProfile({...records,resume},user);}));
 }catch(e){return failure(e);}
}
export async function GET(){
 try{const user=await identity();if(!user)return reply({error:'Please sign in.'},401);const records=await loadRecords(user);requireResumeRecord(records);const files=records.resume.fields['Resume File']||[];if(files.length>1)throw new ProfileError('Multiple resumes remain from an earlier upload. Replace your PDF to choose the current version.',409);const file=files[0];if(!file)return reply({error:'No resume uploaded.'},404);
 const url=new URL(file.url);if(url.protocol!=='https:'||!url.hostname.endsWith('.airtableusercontent.com'))throw new ProfileError('The resume download URL was not recognized.',503);
 const res=await fetch(url,{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(15000)});if(!res.ok)throw new ProfileError('Resume download is temporarily unavailable. Try again.',503);
 return new Response(res.body,{headers:{'Content-Type':'application/octet-stream','Content-Disposition':'attachment; filename="ColorStack-UTA-resume.pdf"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 }catch(e){return failure(e);}
}
