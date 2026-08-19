# ColorStack UTA — Website

Next.js site for the ColorStack chapter at UT Arlington.

Pages: Home (hero, stats, member dues portal, events, highlights, mission, partners), About (mission, e-board, officers, national org), Sponsors (pitch, benefits, sponsored events, partner workshops, contact form), Admin (officer photo uploads).

## Set up the shared database (Upstash Redis via Vercel — free tier)

Member dues, uploaded photos, and sponsor form submissions are shared across every visitor through a real database, not saved to individual browsers. One-time setup, no code changes needed:

1. Open your project on vercel.com → **Storage** tab
2. **Create Database** → choose **Upstash** → **Redis**
3. Follow the prompts to create it (free tier is enough for this site)
4. On the "Connect to Project" step, select this project — Vercel automatically adds the required environment variables for you
5. Redeploy (Deployments tab → latest deployment → **Redeploy**) so the new environment variables take effect

**Until this is done**, the site still loads, but the member portal lookup, photo uploads, and the sponsor contact form will show an error instead of saving anything — the API fails clearly rather than pretending to work.

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

## 2. Deploy on Vercel

1. vercel.com → **Add New Project** → import the repo
2. Framework preset auto-detects as Next.js — leave defaults, click **Deploy**
3. Then follow the database setup above and redeploy once more

## 3. Run it locally (optional)

Local dev won't have the database connected unless you pull the env vars down:

```bash
npm install -g vercel   # if you don't already have the CLI
vercel link             # connect this folder to your Vercel project
vercel env pull .env.local
npm install
npm run dev
```

## How the database is wired up

- `app/api/storage/route.js` — the only file that talks to the database (Upstash Redis). Reads its credentials from environment variables that Vercel injects automatically. The browser never sees these credentials.
- `lib/storage.js` — the client-side helper every page calls (`storage.get/set/delete`). It calls that API route over HTTP; it has no direct database access itself.

Every key is stored under a `colorstackuta:` prefix (e.g. `colorstackuta:members`, `colorstackuta:siteImages`), so this Redis store can safely hold other data later without collisions.

## Still worth doing before this handles real member data

- **Officer passcode** — `OFFICER_PASSCODE` in `lib/content.js` is a single shared code, not real login. Replace with Clerk (free in the GitHub Student Developer Pack) so each officer has their own account and actions are attributable.
- **Connect `colorstackuta.dev`** — Vercel project → Settings → Domains.
