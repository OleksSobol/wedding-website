#  Catherine & Oleksandr Wedding Website

> **June 20, 2026** | Deployed via **Cloudflare Pages**

A simple, elegant wedding website with RSVP integration and photo gallery. Password protection currently disabled (see `js/script.js` flag `BYPASS_AUTH`).

---
##  Features
-  Responsive, mobilefirst design
-  Live countdown (and automatic countup after the date)
-  RSVP form (Google Apps Script + Google Sheet backend)
-  Accommodation expandable cards
-  Lightbox photo gallery (GLightbox)
-  Song request & dietary restriction capture
-  Scroll & intersection animations

---
##  Deployment (Cloudflare Pages)

### Option 1: Dashboard (Recommended for First Time)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)  Pages  "Create a project"
2. Connect your GitHub repo: `OleksSobol/wedding-website`
3. Build settings:
   - **Build command**: (leave empty)
   - **Build output directory**: `/` (root)
   - **Root directory**: (leave empty)
4. Click "Save and Deploy"
5. Every push to `main` will auto-deploy

### Option 2: Wrangler CLI (Manual Deploy)
```bash
# Install wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy manually
npm run deploy
# OR: wrangler pages deploy . --project-name=wedding-website
```

### Custom Domain
1. In Cloudflare Pages project settings  "Custom domains"
2. Add `solstice2026.party` (or your domain)
3. Cloudflare will auto-configure DNS if domain is on Cloudflare
4. SSL provisioned automatically

---
##  Local Development
```bash
npm install
npm run start
# Opens at http://localhost:8888
```
Or with Python:
```bash
python -m http.server 8888
```

---
##  RSVP Backend (Google Sheets)
1. Create a Google Sheet for responses.
2. In Apps Script, deploy a Web App (Anyone access) that receives POST JSON.
3. Update the Web App endpoint in `js/script.js` (search for `GOOGLE_SCRIPT_CONFIG`).

---
##  Password Gate (Temporarily Disabled)
Set `window.BYPASS_AUTH = false;` in `js/script.js` to re-enable.

**For server-side auth on Cloudflare Pages:**
- Create a Cloudflare Worker/Pages Function in `functions/auth.js`
- Use environment variables for password storage

---
##  Useful Commands
```bash
npm install          # Install dependencies
npm run start        # Start local server
npm run deploy       # Deploy to Cloudflare Pages
```

---
**Made with  | Hosted on Cloudflare Pages | November 2025**
