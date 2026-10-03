import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const member={id:'rec12345678901234',fields:{'Clerk User ID':'user_test'}};
let ledger=[],cache=new Map(),sessions=new Map(),created=0,failAfterCreate=false;
const api=async(path,opts)=>{
 if(path.startsWith('members/'))return member;
 if(opts?.method==='PATCH'){const fields=JSON.parse(opts.body).records[0].fields;ledger=[{id:'recPayment',fields}];return {};}
 return {records:ledger};
};
class Redis{async get(k){return cache.get(k);}async set(k,v){cache.set(k,v);}}
class ProfileError extends Error{constructor(m,status){super(m);this.status=status;}}
globalThis.__duesTest={Redis,api,find:async()=>member,TABLES:{members:'members'},quote:JSON.stringify,withProfileLock:async(_,fn)=>fn(),ProfileError};
let source=await readFile(new URL('../lib/server/dues.js',import.meta.url),'utf8');
source=source.replace("import 'server-only';",'').replace("import {Redis} from '@upstash/redis';",'const {Redis,api,find,TABLES,quote,withProfileLock,ProfileError}=globalThis.__duesTest;').replace(/import \{api,find,TABLES,quote,withProfileLock\} from '.\/profiles';/,'').replace(/import \{ProfileError\} from '..\/profile-fields.mjs';/,'');
for(const name of ['stripe','terms'])source=source.replace(`'../payments/${name}.mjs'`,JSON.stringify(new URL(`../lib/payments/${name}.mjs`,import.meta.url).href));
const svc=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
process.env.STRIPE_SECRET_KEY='sk_test_fake';process.env.AIRTABLE_BASE_ID='apppmStwT2Y3uhD99';process.env.AIRTABLE_ACCESS_TOKEN='fake';process.env.VERCEL_ENV='preview';
const originalFetch=globalThis.fetch,OriginalDate=Date;
class FixedDate extends OriginalDate{constructor(...args){super(...(args.length?args:['2026-09-27T12:00:00Z']));}static now(){return OriginalDate.parse('2026-09-27T12:00:00Z');}}
globalThis.Date=FixedDate;
globalThis.fetch=async(url,opts)=>{
 let session;
 if(url.includes('/checkout/sessions?payment_intent='))return {ok:true,json:async()=>({data:[...sessions.values()],has_more:false})};
 if(url.endsWith('/checkout/sessions')){
 const key=opts.headers['Idempotency-Key'];session=sessions.get(key);
 if(!session){created++;const b=opts.body;session={id:'cs_test_one',url:'https://checkout.stripe.com/test',status:'open',payment_status:'unpaid',livemode:false,mode:'payment',currency:'usd',amount_total:1500,created:Date.now()/1000,expires_at:Number(b.get('expires_at')),client_reference_id:b.get('client_reference_id'),metadata:Object.fromEntries(['purpose','plan','member_record_id','clerk_user_id','semester'].map(k=>[k,b.get(`metadata[${k}]`)])),line_items:{data:[{quantity:1,price:{id:b.get('line_items[0][price]')}}]},payment_intent:{id:'pi_test',latest_charge:{amount_refunded:0}}};sessions.set(key,session);}
 if(failAfterCreate){failAfterCreate=false;throw Error('connection interrupted');}
 }else session=[...sessions.values()][0];
 return {ok:true,json:async()=>session};
};
test('checkout recovers uncertain creation, reuses open session, links identity, records once and prevents repeat payment',async()=>{
 try{
 await assert.rejects(svc.requirePaidResumeAccess({id:'user_test'},member),/Pay membership dues/);
 await assert.rejects(svc.requirePaidResumeAccess({id:'user_other'},member),/own member profile/);
 failAfterCreate=true;await assert.rejects(svc.checkout({id:'user_test'},'semester','https://preview.example'));
 await svc.checkout({id:'user_test'},'semester','https://preview.example');
 await svc.checkout({id:'user_test'},'semester','https://preview.example');assert.equal(created,1);
 const session=[...sessions.values()][0];assert.equal(session.metadata.clerk_user_id,'user_test');
 session.status='complete';session.payment_status='paid';
 const status=await svc.duesStatus({id:'user_test'});assert.equal(status.paid,true);assert.equal(ledger.length,1);
 await svc.requirePaidResumeAccess({id:'user_test'},member);
 await assert.rejects(svc.requirePaidResumeAccess({id:'user_test'},{...member,fields:{...member.fields,'Membership Status':'Suspended'}}),/officer review/);
 class ExpiredDate extends OriginalDate{constructor(...args){super(...(args.length?args:['2027-06-02T12:00:00Z']));}static now(){return OriginalDate.parse('2027-06-02T12:00:00Z');}}
 globalThis.Date=ExpiredDate;await assert.rejects(svc.requirePaidResumeAccess({id:'user_test'},member),/Pay membership dues/);globalThis.Date=FixedDate;
 await assert.rejects(svc.checkout({id:'user_test'},'semester','https://preview.example'),/already cover/);
 session.payment_intent.latest_charge.amount_refunded=1500;
 await svc.reconcilePaymentEvent({type:'charge.refunded',data:{object:{payment_intent:'pi_test'}}});
 assert.equal(ledger[0].fields['Payment Status'],'Refunded');
 assert.equal((await svc.duesStatus({id:'user_test'})).paid,false);
 await assert.rejects(svc.requirePaidResumeAccess({id:'user_test'},member),/Pay membership dues/);
 session.payment_intent.latest_charge.amount_refunded=0;session.payment_intent.latest_charge.disputed=true;
 await assert.rejects(svc.requirePaidResumeAccess({id:'user_test'},member),/Pay membership dues/);
 await assert.rejects(svc.checkout({id:'user_test'},'semester','https://preview.example'),/officer review/);
 await svc.reconcilePaymentEvent({type:'charge.dispute.created',data:{object:{payment_intent:'pi_test'}}});assert.equal(ledger[0].fields['Payment Status'],'Disputed');
 session.payment_intent.latest_charge.disputed=false;await svc.reconcilePaymentEvent({type:'checkout.session.completed',data:{object:{id:session.id}}});assert.equal(ledger[0].fields['Payment Status'],'Paid');
 session.metadata.clerk_user_id='user_other';await assert.rejects(svc.duesStatus({id:'user_test'}),/mismatch/);
 }finally{globalThis.fetch=originalFetch;globalThis.Date=OriginalDate;delete globalThis.__duesTest;}
});
