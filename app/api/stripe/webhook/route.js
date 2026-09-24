import { NextResponse } from 'next/server';
import { verifyStripeEvent, requireTestConfiguration, paymentRecord } from '@/lib/payments/stripe.mjs';
import { recordPayment } from '@/lib/payments/airtable.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  try {
    requireTestConfiguration(process.env);
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('Missing webhook secret');
  } catch { return reply({ error: 'Payment integration is not configured for sandbox testing.' }, 503); }
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 262144) return reply({ error: 'Payload too large' }, 413);
  let event;
  try { event = verifyStripeEvent(raw, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return reply({ error: 'Invalid signature' }, 400); }
  if (event.livemode !== false) return reply({ error: 'Test events only' }, 400);
  if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) return reply({ received: true });
  const sessionId = event.data?.object?.id;
  if (!/^cs_test_[A-Za-z0-9]+$/.test(sessionId || '')) return reply({ error: 'Invalid session' }, 400);
  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` }, cache: 'no-store', signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Stripe lookup failed');
    const session = await response.json();
    if (session.line_items?.has_more) throw new Error('Unexpected line items');
    const terms = JSON.parse(process.env.MEMBERSHIP_TEST_TERM || 'null');
    const fields = paymentRecord(session, session.line_items?.data || [], terms);
    if (fields) await recordPayment(process.env, fields);
    return reply({ received: true });
  } catch {
    // Do not acknowledge success before persistence: Stripe can retry failures.
    // Never log payloads, credentials, billing information, or member records.
    return reply({ error: 'Payment processing incomplete; retry required.' }, 500);
  }
}
