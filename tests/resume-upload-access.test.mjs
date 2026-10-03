import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ProfileError} from '../lib/profile-fields.mjs';
let paid=false,writes=0;
const records={member:{id:'recMember'},resume:{id:'recResume'}};
globalThis.__uploadTest={
 identity:async()=>({id:'user_test'}),sameOrigin:()=>true,ProfileError,
 requirePaidResumeAccess:async()=>{if(!paid)throw new ProfileError('Pay membership dues',403);},
 loadRecords:async()=>records,withProfileLock:async(_,fn)=>fn(),TABLES:{resumes:'resumes'},
 consentFields:()=>({consent:false}),displayProfile:r=>({ok:true}),
 patch:async()=>{writes++;return records.resume;},
 api:async(_,options)=>{writes++;return {fields:{files:[{id:'attachment',filename:JSON.parse(options.body).filename}]}};},
};
let source=await readFile(new URL('../app/api/profile/resume/route.js',import.meta.url),'utf8');
source=source.replace(/^import .* from '@\/.*';\n/gm,'');
source='const {identity,sameOrigin,ProfileError,requirePaidResumeAccess,loadRecords,withProfileLock,TABLES,consentFields,displayProfile,patch,api}=globalThis.__uploadTest;\n'+source;
const route=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
function request(){const data=new FormData();data.set('resume',new Blob(['%PDF-1.4\nexample resume\n%%EOF'],{type:'application/pdf'}),'resume.pdf');return new Request('https://example.org/api/profile/resume',{method:'POST',body:data});}
test('direct upload denies unpaid requests before changing attachments or consent; paid upload replaces file',async()=>{
 assert.equal((await route.POST(request())).status,403);assert.equal(writes,0);
 paid=true;assert.equal((await route.POST(request())).status,200);assert.equal(writes,3);
 delete globalThis.__uploadTest;
});
