# Member profile Preview

This feature is enabled only when VERCEL_ENV is not production and AIRTABLE_BASE_ID is apppmStwT2Y3uhD99. Use the existing Preview Clerk, Airtable and Redis variables. No secrets belong in source control.

Members: verified Clerk identity is the immutable lookup key. New members with an existing unlinked email are stopped for officer review instead of automatically taking over that row. Clerk User ID is required in Members, Resumes and Demographics. Duplicate or inconsistent links fail closed. Each child record must link to exactly the current member.

Academic fields use Members. Graduation month/year and career interests use Resumes, even before a PDF is uploaded. Demographic fields stay in Demographics. All three tables must remain private to authorized chapter administrators. Do not share the full base or a demographics view with partners.

Resumes: PDF up to 3 MB, uploaded through the authenticated server directly to Airtable's attachment upload API. Downloads are authenticated and returned as attachments; Airtable file URLs are not returned to the profile browser. Replacement/removal turns sharing off. Opt-in requires a saved resume. Consent Record records version, decision, wording and server timestamp. Partner exports are not yet implemented; future exports must filter BOTH consent checkboxes and a present resume, and whitelist only academic/career fields. Withdrawal cannot recall copies already delivered.

Airtable requirements:
- Members: existing Name, Email, Major, Graduation Year, Academic Standing, LinkedIn URL, Portfolio URL, Clerk User ID.
- Resumes: existing Member link, Resume File attachment, Graduation Month/Year, Career Interests, Preferred Work Locations, Upload Date, Resume Updated Date, Resume Book Opt-in, Explicit Resume Sharing Consent, Withdrawn Opt-in Timestamp; added Clerk User ID (single-line) and Consent Record (long text).
- Demographics: existing Member link, Race/Ethnicity, Gender, LGBTQ+ Identity, International Student Status, Submission Date; added Clerk User ID (single-line).
- Save uses typecast only with server-validated select values to add the form's fixed choices where absent. Token owner needs permission to create missing select choices, or these must be added manually first.

Saves are serialized per account in Redis and upserted by Clerk User ID. The Airtable tables are not a transaction: a failed multi-table save may be partially written. The UI reports failure; retry safely completes upserts. Calls are paced across instances using Redis to reduce Airtable rate-limit errors. Attachment upload is followed by a replacement patch; a failed patch may leave multiple files temporarily attached. Refresh before retrying.

No profile route writes membership status or payment fields. Stripe Checkout and payment entitlement sync remain a separate task. No officer-access or partner export UI is added by this feature.

Validation: production build and profile ownership/input tests passed locally. A real signed-in Preview save and attachment upload must be verified with the member's own test account before merging. Never enable real collection on production until production configuration, authorized Airtable access, and partner export controls have been reviewed.

Recruiting update (2026-09-27): Opportunity Type now has its own text column in Resumes; Career Interests contains role areas and Availability holds Available now, Not sure yet, or a month/year. Legacy opportunity values are read compatibly and moved on save. Manuel's existing Internship answer was moved to Opportunity Type in the test base. No availability or career preferences were guessed.

/admin/resume-book is officer-only. /api/resume-book validates officer identity on every request, accepts only selected eligible resume IDs, whitelists recruiting fields, neutralizes CSV formulas, and rechecks consent plus attachment identity before generating. Both consent checkboxes, consistent unique Clerk/member links, and exactly one PDF are required. ZIP batches contain a filterable CSV plus PDFs; batches are limited to 20 members and 3.5 MB of PDF data to remain within hosted response limits. Generation is logged in Resume Book Releases with recipient, included members, attachment IDs, officer and timestamp. Delivery Date stays blank: an officer must review and distribute the files separately. No public links, company login, merged PDF, or automatic delivery are included. Downloaded snapshots cannot be revoked. Production remains disabled by the existing profile configuration guard.
