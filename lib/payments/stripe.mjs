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

export function requireTestConfiguration(env) {
  if (env.VERCEL_ENV === 'production' || env.AIRTABLE_BASE_ID !== TEST_BASE || !env.STRIPE_SECRET_KEY?.startsWith('sk_test_') || !env.AIRTABLE_ACCESS_TOKEN) {
    throw new Error('Sandbox configuration required');
  }
}

export function paymentRecord(session, lineItems, terms) {
  if (session.livemode !== false || session.mode !== 'payment' || session.payment_status !== 'paid') return null;
  const meta = session.metadata || {};
  if (meta.purpose !== 'colorstack_dues_v1') return null;
  const price = PRICES[meta.plan];
  if (!price || !/^rec[A-Za-z0-9]{14}$/.test(meta.member_record_id || '') || !/^cs_test_/.test(session.id)) throw new Error('Invalid membership reference');
  if (!terms?.semester || !/^\d{4}-\d{2}-\d{2}$/.test(terms.starts || '') || !/^\d{4}-\d{2}-\d{2}$/.test(terms.ends || '')) throw new Error('Membership period must be configured');
  const created = new Date(session.created * 1000).toISOString().slice(0, 10);
  if (created < terms.starts || created > terms.ends || meta.semester !== terms.semester) throw new Error('Payment outside configured period');
  if (meta.plan === 'annual' && (!/^Fall \d{4}$/.test(terms.semester) || !terms.followingSpring)) throw new Error('Annual membership is fall only');
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
  };
}
