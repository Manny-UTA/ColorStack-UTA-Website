import {chicagoDate, checkoutDeadline} from './terms.mjs';
import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyStripeEvent(raw, header, secret, now = Date.now()) {
  if (!secret || !header) throw new Error('Missing signature configuration');
  const parts = header.split(',').map(part => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  if (!/^\d+$/.test(timestamp || '') || Math.abs(now / 1000 - Number(timestamp)) > 300) {
    throw new Error('Expired signature');
  }
  const expected = createHmac('sha256', secret).update(`${timestamp}.${raw}`).digest();
  const valid = parts.some(([key, value]) => key === 'v1' && /^[a-f0-9]{64}$/i.test(value || '') && timingSafeEqual(expected, Buffer.from(value, 'hex')));
  if (!valid) throw new Error('Invalid signature');
  return JSON.parse(raw);
}

export const TEST_BASE = 'apppmStwT2Y3uhD99';
export const PRICES = {
  semester: { id: 'price_1UHW8619st0UEopYpMewIyCy', amount: 1500 },
  annual: { id: 'price_1UHW8y19st0UEopYV1U1FCR0', amount: 2500 },
};

export const LIVE_BASE = 'appRAmui8h8XT70Oa';
export const LIVE_PRICES = {
  semester: {id:'price_1ULUjV01WlEk19nYptI0WqUq',amount:1500},
  annual: {id:'price_1ULUkQ01WlEk19nYHyQPONRV',amount:2500},
};
export function paymentConfiguration(env) {
  const live=env.VERCEL_ENV==='production';
  if(live){
    if(env.MEMBERSHIP_LIVE_ENABLED!=='true'||env.AIRTABLE_BASE_ID!==LIVE_BASE||!env.STRIPE_SECRET_KEY?.startsWith('sk_live_')||!env.AIRTABLE_ACCESS_TOKEN) throw Error('Live membership configuration is incomplete');
  }else requireTestConfiguration(env);
  return {live,prices:live?LIVE_PRICES:PRICES,sessionPattern:live?/^cs_live_[A-Za-z0-9]+$/:/^cs_test_[A-Za-z0-9]+$/};
}

export function requireTestConfiguration(env) {
  if (env.VERCEL_ENV === 'production' || env.AIRTABLE_BASE_ID !== TEST_BASE || !env.STRIPE_SECRET_KEY?.startsWith('sk_test_') || !env.AIRTABLE_ACCESS_TOKEN) {
    throw new Error('Sandbox configuration required');
  }
}

export function paymentRecord(session, lineItems, terms, configuration = {live:false,prices:PRICES,sessionPattern:/^cs_test_[A-Za-z0-9]+$/}) {
  if (session.livemode !== configuration.live || session.mode !== 'payment' || session.payment_status !== 'paid') return null;
  const meta = session.metadata || {};
  if (meta.purpose !== 'colorstack_dues_v1') return null;
  const price = configuration.prices[meta.plan];
  if (!price || !/^rec[A-Za-z0-9]{14}$/.test(meta.member_record_id || '') || !configuration.sessionPattern.test(session.id)) throw new Error('Invalid membership reference');
  if (!terms?.semester || !/^\d{4}-\d{2}-\d{2}$/.test(terms.starts || '') || !/^\d{4}-\d{2}-\d{2}$/.test(terms.ends || '')) throw new Error('Membership period must be configured');
  const created = chicagoDate(new Date(session.created * 1000));
  if (created < terms.starts || created > terms.ends || meta.semester !== terms.semester) throw new Error('Payment outside configured period');
  if (meta.plan === 'annual' && (!/^Fall \d{4}$/.test(terms.semester) || !terms.followingSpring)) throw new Error('Annual membership is fall only');
  if(meta.plan==='annual' && terms.annualCutoff && (session.created*1000>checkoutDeadline(terms,'annual') || session.expires_at*1000>checkoutDeadline(terms,'annual'))) throw new Error('Annual enrollment closed');
  if (session.currency !== 'usd' || session.amount_total !== price.amount || lineItems.length !== 1 || lineItems[0].price?.id !== price.id || lineItems[0].quantity !== 1) throw new Error('Unexpected price or amount');
  return {
    'Stripe Session ID': session.id,
    'Stripe Payment Intent ID': typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    'Amount Paid': price.amount / 100,
    'Payment Status': 'Paid',
    'Payment Date': created,
    'Covered Semesters': meta.plan === 'annual' ? [terms.semester, terms.followingSpring] : [terms.semester],
    'Member': [meta.member_record_id],
    'Payment Method': 'Stripe',
    'Member Record ID': meta.member_record_id,
    'Coverage Start': terms.starts,
    'Coverage End': meta.plan === 'annual' ? (terms.annualEnds || '') : terms.ends,
    'Amount Refunded': 0,
  };
}
