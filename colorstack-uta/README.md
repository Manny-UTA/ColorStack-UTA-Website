# ColorStack UTA — Website

Next.js site for the ColorStack chapter at UT Arlington. Includes:
- Landing page (hero, stats, events, mission, partners)
- Member portal — look up dues status by email, see upcoming events
- Officer admin portal — passcode-gated photo uploads for the hero image and event highlight tiles

## 1. Push this to GitHub

```bash
cd colorstack-uta
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/colorstack-uta.git
git push -u origin main
```

(Create the empty repo on GitHub first, then run the commands above.)

## 2. Deploy on Vercel

1. Go to vercel.com → **Add New Project**
2. Import the `colorstack-uta` GitHub repo
3. Framework preset auto-detects as **Next.js** — leave defaults, click **Deploy**
4. You'll get a live `.vercel.app` URL in about a minute

## 3. Connect your domain (colorstackuta.dev)

1. In the Vercel project → **Settings → Domains** → add `colorstackuta.dev`
2. Vercel shows you DNS records to add
3. Go to Name.com → your domain's DNS settings → add those exact records
4. DNS can take anywhere from a few minutes to a few hours to propagate

## 4. Run it locally first (optional but recommended)

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to see it before pushing anything live.

## Before this handles real member data

Two things in here are intentionally temporary, marked clearly in the code:

- **`lib/storage.js`** — currently saves to each visitor's own browser (`localStorage`), so members and officers on different devices don't see the same data. Swap this file's internals for a real database call (Supabase or MongoDB Atlas — both free-tier, both included in the GitHub Student Developer Pack) and every other file keeps working unchanged.
- **Officer passcode** — `OFFICER_PASSCODE` in `components/ColorStackUTA.jsx` is a single shared code, not real login. Replace with Clerk (also free in the Student Pack) so each officer has their own account.

Everything else — layout, copy, the portal UI, the upload flow — is ready as-is.
