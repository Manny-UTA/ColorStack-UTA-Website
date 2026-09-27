# Sandbox dues

Preview only; production and non-test Stripe keys are rejected. Test Airtable base: apppmStwT2Y3uhD99. Uses existing semester $15 and annual $25 Stripe prices.

Member signs in, saves profile, opens checkout. Stripe metadata is generated on the server from Clerk identity and the linked member. A Redis-held idempotency key recovers uncertain creation; an existing open session is reused or expired before changing plans. Existing paid coverage prevents another checkout.

Fall 2026: August 1–December 31. Spring 2027: January 1–May 31. Annual covers both; annual checkout expires by October 31, Chicago time. New checkout stops 31 minutes before the deadline because Stripe requires a 30-minute minimum expiration. No automatic renewal or annual upgrade after semester payment.

GET /api/dues reconciles the member's pending checkout and saved Stripe sessions against Stripe, writes verified payments to Dues Payments by Stripe Session ID, and derives coverage. This also reconciles refunds/disputes on the next portal refresh. It never overwrites Membership Status. Partial refunds require officer review. Existing manual/Zelle dues are not imported by this sandbox flow.

Webhook: /api/stripe/webhook, events checkout.session.completed and checkout.session.async_payment_succeeded. Configure STRIPE_WEBHOOK_SECRET in Preview. The endpoint must be reachable by Stripe without Vercel login; protected Preview requires an explicitly approved automation-bypass setup. Do not disable protection for member pages. Until webhook delivery is configured, payment synchronization happens on Portal load/Refresh dues status; do not claim unattended synchronization is enabled.

Required Preview vars: existing Clerk, Redis, AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID, STRIPE_SECRET_KEY (sk_test_). No browser-visible Stripe secret. Bank and live activation are not required for sandbox.

Airtable Dues Payments fields used: Stripe Session ID and Stripe Payment Intent ID (text), Member Record ID (text), Member (Members link), Amount Paid and Amount Refunded (currency), Payment Status (select), Payment Date, Coverage Start, Coverage End (dates), Covered Semesters (multiple select), Payment Method (select). Typecast adds Paid/Refunded/Disputed/Stripe/semester options if the token permits.

Tests: node --test tests/*.test.mjs. Live acceptance: test-card payment, verify Airtable link/amount/dates, refresh twice without duplicate rows, ensure paid member cannot repurchase. Never enter a real card on Preview. Do not merge to main until webhook delivery, live activation, live prices/keys, production data separation, refund lifecycle, and real payment verification have been reviewed.
