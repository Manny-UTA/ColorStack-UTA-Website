import 'server-only';
import {Redis} from '@upstash/redis';
import {randomUUID} from 'node:crypto';
import {api,find,TABLES,quote,withProfileLock} from './profiles';
import {ProfileError} from '../profile-fields.mjs';
import {PRICES,requireTestConfiguration,paymentRecord} from '../payments/stripe.mjs';
import {currentTerm,sessionTerm,annualAvailable,checkoutDeadline,coverage} from '../payments/terms.mjs';
const PAYMENTS='tblB8xo8CE5LMTNHW';
const fail=(message,status=503)=>{throw new ProfileError(message,status,'DUES');};
function redis(){return new Redis({url:process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,token:process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN});}
function ready(){try{requireTestConfiguration(process.env);}catch{fail('Stripe sandbox is not configured for this Preview.');}}
export async function stripe(path,options={}){
 ready();const res=await fetch(`https://api.stripe.com/v1/${path}`,{...options,headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded',...options.headers},cache:'no-store',signal:AbortSignal.timeout(12000)});
 if(!res.ok){const err=await res.json().catch(()=>({}));console.error('Stripe request failed',{status:res.status,code:err.error?.code,type:err.error?.type});fail('Stripe could not complete this request. Please retry; if you already paid, do not pay again.');}
 return res.json();
}
export async function getSession(id){if(!/^cs_test_[A-Za-z0-9]+$/.test(id))fail('Invalid checkout reference.',400);return stripe(`checkout/sessions/${id}?expand[]=line_items&expand[]=payment_intent.latest_charge`);}
function owned(session,member,userId){return session.metadata?.member_record_id===member.id&&session.metadata?.clerk_user_id===userId&&session.client_reference_id===member.id;}
export async function fulfill(session){
 const term=sessionTerm(session);const fields=paymentRecord(session,session.line_items?.data||[],term);
 if(!fields)return false;
 if(session.line_items?.has_more)fail('Unexpected checkout items.');
 const member=await api(`${TABLES.members}/${fields.Member[0]}`);
 if(!owned(session,member,member.fields['Clerk User ID']))fail('Checkout account link needs officer review.',409);
 const charge=session.payment_intent?.latest_charge;
 if(!charge||typeof charge!=='object')fail('Payment confirmation is incomplete. Please refresh.');
 fields['Amount Refunded']=(charge.amount_refunded||0)/100;
 if(charge.disputed)fields['Payment Status']='Disputed';
 else if(charge.amount_refunded>0)fields['Payment Status']='Refunded';
 await api(PAYMENTS,{method:'PATCH',body:JSON.stringify({performUpsert:{fieldsToMergeOn:['Stripe Session ID']},typecast:true,records:[{fields}]})});
 return true;
}
async function payments(member){
 const q=new URLSearchParams({filterByFormula:`{Member Record ID}=${quote(member.id)}`,pageSize:'100'});
 const data=await api(`${PAYMENTS}?${q}`);
 if(data.offset)fail('Payment history needs an officer review.',409);
 return data.records.filter(r=>r.fields.Member?.length===1&&r.fields.Member[0]===member.id&&/^cs_test_/.test(r.fields['Stripe Session ID']||''));
}
const pointer=member=>`colorstackuta:dues:preview:v1:${member.id}`;
async function refresh(member,userId){
 const db=redis(),attempt=await db.get(pointer(member));
 if(attempt?.id){const session=await getSession(attempt.id);if(!owned(session,member,userId))fail('Checkout account mismatch.',409);if(session.payment_status==='paid')await fulfill(session);}
 let rows=await payments(member);
 // Reconcile refund/dispute changes before displaying coverage or allowing another checkout.
 for(const row of rows){const session=await getSession(row.fields['Stripe Session ID']);if(!owned(session,member,userId))fail('Payment ownership mismatch.',409);await fulfill(session);}
 if(rows.length)rows=await payments(member);
 return {attempt,rows};
}
function summary(member,rows){
 const term=currentTerm(),paid=rows.filter(r=>coverage(r.fields,term));
 return {sandbox:true,profileExists:Boolean(member),term:term?.semester||null,paid:Boolean(paid.length),coverageEnd:paid.map(r=>r.fields['Coverage End']).sort().at(-1)||null,semesterEnd:term?.ends,annualEnd:term?.annualEnds,annualAvailable:annualAvailable(term),payments:rows.map(r=>({amount:r.fields['Amount Paid'],status:r.fields['Payment Status'],end:r.fields['Coverage End']}))};
}
export async function duesStatus(user){
 ready();return withProfileLock(user.id,async()=>{const member=await find(TABLES.members,user.id);if(!member)return summary(null,[]);const {rows}=await refresh(member,user.id);return summary(member,rows);});
}
export async function checkout(user,plan,origin){
 ready();if(!Object.hasOwn(PRICES,plan))fail('Choose semester or academic-year dues.',400);
 return withProfileLock(user.id,async()=>{
 const member=await find(TABLES.members,user.id);if(!member)fail('Save your member profile before paying dues.',409);
 if(['Alumni','Suspended','Inactive'].includes(member.fields['Membership Status']))fail('Ask an officer to review your membership before paying dues.',409);
 const term=currentTerm();if(!term)fail('Enrollment is currently closed.',409);
 if(plan==='annual'&&!annualAvailable(term))fail('The academic-year discount is available only through October 31.',409);
 const {attempt,rows}=await refresh(member,user.id);
 if(rows.some(r=>coverage(r.fields,term)))fail('Your dues already cover this semester.',409);
 if(rows.some(r=>r.fields['Payment Status']!=='Paid'&&r.fields['Covered Semesters']?.includes(term.semester)))fail('A refunded or disputed payment needs officer review before another payment.',409);
 const db=redis();let next=attempt;
 if(attempt?.id){
 const old=await getSession(attempt.id);
 if(old.status==='open'){
 if(attempt.plan===plan&&attempt.semester===term.semester)return {url:old.url};
 await stripe(`checkout/sessions/${old.id}/expire`,{method:'POST'});
 }else if(old.status==='complete'&& (old.payment_status!=='paid'||attempt.semester===term.semester))fail('Your previous payment is still being confirmed. Refresh your dues status.',409);
 next=null;
 }
 if(next&&!next.id&&(next.plan!==plan||next.semester!==term.semester))fail('Retry your original dues option so we can safely recover checkout.',409);
 if(!next){
 const deadline=checkoutDeadline(term,plan),expires=Math.min(Date.now()+60*60000,deadline);
 if(expires-Date.now()<31*60000)fail('Enrollment for this option is closing. Contact an officer.',409);
 next={key:randomUUID(),plan,semester:term.semester,expires:Math.floor(expires/1000),origin};
 await db.set(pointer(member),next);
 }
 // Persist the idempotency key and exact parameters before calling Stripe, so uncertain retries cannot create a second checkout.
 const body=new URLSearchParams({mode:'payment','payment_method_types[0]':'card','line_items[0][price]':PRICES[plan].id,'line_items[0][quantity]':'1',client_reference_id:member.id,expires_at:String(next.expires),success_url:`${next.origin}/portal?dues=returned`,cancel_url:`${next.origin}/portal?dues=cancelled`,'metadata[purpose]':'colorstack_dues_v1','metadata[plan]':plan,'metadata[member_record_id]':member.id,'metadata[clerk_user_id]':user.id,'metadata[semester]':term.semester});
 const session=await stripe('checkout/sessions',{method:'POST',headers:{'Idempotency-Key':`dues-${next.key}`},body});
 if(!session.url?.startsWith('https://checkout.stripe.com/'))fail('Stripe checkout URL was unavailable.');
 await db.set(pointer(member),{...next,id:session.id});return {url:session.url};
 });
}
