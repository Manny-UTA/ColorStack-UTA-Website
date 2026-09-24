# Clerk login preview

This package restores individual verified sign-in and server-checked officer photo editing. It is NOT the finished Stripe/Airtable membership integration.

## Deploy

Use the files at this directory's root as the repository root. Do not nest them inside another colorstack-uta directory. Vercel Root Directory must be blank. Create a non-production branch and deploy it as Preview.

Preview environment variables:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (Config; Clerk pk_test key)
- CLERK_SECRET_KEY (Secret; Clerk sk_test key)
- UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL and KV_REST_API_TOKEN (for photo and sponsor storage)

Existing Stripe and Airtable variables stay private. This login pass does not yet read or update memberships in Airtable or offer checkout.

## Officer approval

After an officer signs up, a trusted Clerk dashboard administrator opens Users, selects the exact verified account, and edits PRIVATE metadata. Preserve any other metadata. Set colorstackRole to one of:

president, internal_vp, external_vp, treasurer, secretary, recruitment

Example: {"colorstackRole":"external_vp"}

Remove colorstackRole to revoke editing. Every protected request fetches the current user from Clerk and checks the private role; no role is accepted from a browser form or public/unsafe metadata. No officer has been granted access by this code change. There is no self-service role management UI yet.

## Check the Preview

1. Sign up at /sign-up; verify email; confirm /portal shows the signed-in email.
2. An unapproved account must not open photo editing at /admin or write to /api/storage.
3. Approve a known test account in Clerk; check /admin upload, drag/drop, and removal; revoke it and verify the next write is denied.
4. Public /api/storage?key=members and ?key=sponsorLeads must return 404. Only events and siteImages are publicly readable.
5. Submit a sponsor inquiry; it is stored append-only in Redis hash colorstackuta:sponsorInquiries. Previous sponsorLeads data is retained but no longer publicly exposed.

## Remaining membership work

Restore verified-user Airtable registration and record ownership; Stripe Checkout tied to that identity; webhook reconciliation and retries; actual sandbox payment test; resume uploads and consent; live Stripe activation and production configuration. A successful login does not mark dues paid.

Known membership policy: $15/semester, $25 academic year only during fall through October 31; Fall 2026 coverage ends December 31, Spring 2027 May 31. No payment UI is enabled by this package.
