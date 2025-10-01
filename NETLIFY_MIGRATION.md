# 🚀 Netlify Migration Guide

## Quick Deployment to Netlify

### 1. **Deploy to Netlify (5 minutes):**

**Option A: Direct GitHub Integration (Recommended)**
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git" 
3. Connect GitHub and select `wedding-website` repository
4. Build settings:
   - **Build command:** `echo "Static site"`
   - **Publish directory:** `.` (root)
5. Click "Deploy site"

**Option B: Manual Deploy**
1. Download your repository as ZIP
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop the ZIP file
4. Set up custom domain later

2. **Set Environment Variable in Netlify:**
   - Go to: Site settings → Environment variables
   - Add: `WEDDING_PASSWORD` = `<your_secure_production_password>`
   - **Important:** Use your real production password here, not the development one!
   - **Note:** Development password should be set in your local `.env` file (see `.env.example`)

### 3. **Configure Custom Domain:**
1. In Netlify → Domain management → Add custom domain
2. Enter: `solstice2026.party`
3. Update your DNS (Cloudflare):
   - Delete old GitHub Pages A records
   - Add Netlify's nameservers or CNAME record
4. Wait for DNS propagation (5-30 minutes)

## 🛠 Local Development

### Setup Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create environment file
cp .env.example .env

# Login to Netlify
netlify login

# Link to your site (after deploying)
netlify link

# Start development server with functions
netlify dev
```

### Development URLs:
- **Site:** http://localhost:8888
- **Function:** http://localhost:8888/.netlify/functions/auth

## 🔐 Security Benefits

### What You Get:
- ✅ **True server-side authentication** (password never in client code)
- ✅ **Environment variable storage** (secure password management)
- ✅ **Automatic HTTPS** (free SSL certificate)
- ✅ **CORS protection** and security headers
- ✅ **Rate limiting** (built into serverless functions)

### How It Works:
```
User enters password → HTTPS POST → Netlify Function → Environment Variable → Validation → Token Response
```

No passwords ever visible in browser DevTools or source code!

## 🔄 Migration from GitHub Pages

### DNS Changes:
1. **Remove GitHub Pages DNS:**
   - Delete A records pointing to GitHub IPs
   
2. **Add Netlify DNS:**
   - Option A: Use Netlify nameservers (easiest)
   - Option B: CNAME record to your Netlify domain

### GitHub Repository:
- Keep your repository on GitHub
- Netlify deploys automatically on push
- Remove `.github/workflows/deploy.yml` (no longer needed)

## 🎯 Testing

### Test Authentication:
1. **Development:** Use the password from your `.env` file 
2. **Production:** Whatever you set in Netlify environment variable

### Verify Deployment:
1. Visit your site
2. Try password authentication
3. Check browser DevTools → Network → No passwords visible!
4. Test RSVP form functionality

## 🆘 Troubleshooting

### Function Not Working:
- Check Netlify function logs in dashboard
- Verify `WEDDING_PASSWORD` environment variable is set
- Ensure `.env` file exists for local development

### Domain Issues:
- DNS changes can take up to 48 hours
- Use `dig solstice2026.party` to check DNS propagation
- Netlify provides temporary URL while DNS updates

### Local Development Issues:
```bash
# Clear Netlify cache
netlify dev --offline

# Check function logs
netlify functions:list
netlify functions:invoke auth --payload '{"password":"test"}'
```

---

**🎉 Once deployed, your wedding website will be fully secure with true server-side authentication!**