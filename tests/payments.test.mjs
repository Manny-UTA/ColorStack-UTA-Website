import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyStripeEvent, paymentRecord, requireTestConfiguration, PRICES, TEST_BASE } from '../lib/payments/stripe.mjs';
import { recordPayment } from '../lib/payments/airtable.mjs';
const now = 1800000000000;
const body = '{"livemode":false}';
const sign = payload => `t=${now/1000},v1=${createHmac('sha256','test-secret').update(`${now/1000}.${payload}`).digest('hex')}`;
test('signature accepts authentic raw body and rejects tampering, expiration and malformed signatures', () => {
 assert.equal(verifyStripeEvent(body, sign(body), 'test-secret', now).livemode, false);
 assert.throws(() => verifyStripeEvent(body+' ', sign(body), 'test-secret', now));
 assert.throws(() => verifyStripeEvent(body, sign(body), 'test-secret', now+301000));
 assert.throws(() => verifyStripeEvent(body, `t=${now/1000},v1=00`, 'test-secret', now));
});
const env = { AIRTABLE_BASE_ID: TEST_BASE, AIRTABLE_ACCESS_TOKEN:'fake', STRIPE_SECRET_KEY:'sk_test_fake', VERCEL_ENV:'preview' };
test('sandbox cannot target production or the real membership base', () => {
 assert.doesNotThrow(() => requireTestConfiguration(env));
 for(const patch of [{VERCEL_ENV:'production'},{AIRTABLE_BASE_ID:'appRAmui8h8XT70Oa'},{STRIPE_SECRET_KEY:'sk_live_fake'}]) assert.throws(() => requireTestConfiguration({...env,...patch}));
});
const terms = {semester:'Fall 2026',starts:'2026-08-01',ends:'2026-12-31',followingSpring:'Spring 2027'};
const session = {id:'cs_test_123',livemode:false,mode:'payment',payment_status:'paid',currency:'usd',amount_total:1500,created:Date.parse('2026-09-20T12:00:00Z')/1000,payment_intent:'pi_test',metadata:{purpose:'colorstack_dues_v1',plan:'semester',member_record_id:'rec12345678901234',semester:'Fall 2026'}};
const items = [{quantity:1,price:{id:PRICES.semester.id}}];
test('unpaid or unrelated checkout never records dues', () => {
 assert.equal(paymentRecord({...session,payment_status:'unpaid'},items,terms),null);
 assert.equal(paymentRecord({...session,metadata:{}},items,terms),null);
});
test('checks price, amount, member reference and period', () => {
 assert.equal(paymentRecord(session,items,terms)['Amount Paid'],15);
 for(const patch of [{amount_total:25},{currency:'eur'},{metadata:{...session.metadata,member_record_id:'bad'}}]) assert.throws(() => paymentRecord({...session,...patch},items,terms));
 assert.throws(() => paymentRecord(session,[{quantity:2,price:{id:PRICES.semester.id}}],terms));
 assert.throws(() => paymentRecord(session,items,null));
 assert.throws(() => paymentRecord(session,items,{...terms,ends:'2026-09-01'}));
});
test('annual covers fall and spring and is rejected for spring enrollment', () => {
 const annual = {...session,amount_total:2500,metadata:{...session.metadata,plan:'annual'}};
 const annualItems=[{quantity:1,price:{id:PRICES.annual.id}}];
 assert.deepEqual(paymentRecord(annual,annualItems,terms)['Covered Semesters'],['Fall 2026','Spring 2027']);
 assert.throws(() => paymentRecord({...annual,metadata:{...annual.metadata,semester:'Spring 2026'}},annualItems,{...terms,semester:'Spring 2026'}));
});
test('retry uses session upsert, verifies member first, and propagates Airtable failures', async () => {
 const calls=[]; const fetcher=async(url,options)=>{calls.push({url,...options});return {ok:true,json:async()=>({})};};
 const fields=paymentRecord(session,items,terms);
 await recordPayment(env,fields,fetcher); await recordPayment(env,fields,fetcher);
 assert.equal(calls[0].url.endsWith('/Members/rec12345678901234'),true);
 assert.deepEqual(JSON.parse(calls[1].body).performUpsert.fieldsToMergeOn,['Stripe Session ID']);
 assert.equal(calls[1].body,calls[3].body);
 await assert.rejects(recordPayment(env,fields,async()=>({ok:false,status:429})));
});
