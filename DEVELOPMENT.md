# 🛠 Development Guide - Wedding Website

## 🤖 Copilot Instructions & Best Practices

### **Project Context**
- **Wedding Date:** June 20, 2026
- **Couple:** Catherine & Oleksandr 
- **Domain:** solstice2026.party
- **Theme:** Sage green, romantic, responsive design
- **Hosting:** Netlify with serverless functions

### **Development Workflow**

#### **Local Development**
```bash
# Start development server
python3 -m http.server 8000
# OR with Netlify CLI for full serverless testing
netlify dev

# Test password: wedding2026
```

#### **Git Workflow**
```bash
# Always use simple commit messages
git add .
git commit -m "Brief description of main change"
git push origin main

# ✅ Good: "Add responsive hero section"
# ❌ Avoid: Multi-line messages with emojis (can get interrupted)
```

### **Architecture**

#### **Authentication System**
- **Local Development:** Fallback password `wedding2026`
- **Production:** Netlify serverless function with environment variable
- **Security:** No passwords stored in client code
- **Flow:** Client → Netlify Function → Session token

#### **File Structure**
```
wedding-website/
├── css/style.css           # Sage green responsive styling
├── js/script.js           # Authentication + wedding features
├── netlify/functions/     # Serverless authentication
├── index.html            # Complete wedding website
├── netlify.toml          # Deployment config
└── .env                  # Local environment (gitignored)
```

### **Key Features**
- 🔐 **Password protection** with secure serverless auth
- 📱 **Mobile-first responsive design**
- ⏱ **Live countdown timer** to wedding date
- 📝 **RSVP form** integration
- 🏨 **Accommodation cards** with expand/collapse
- 📸 **Photo gallery** placeholders
- 🎨 **Sage green color palette**

### **Design System**

#### **Colors**
```css
--primary-blush: #f7f9f7;
--secondary-rose: #a8b8a0;
--romantic-pink: #7a8471;
--accent-gold: #b8860b;
--charcoal: #2d3436;
```

#### **Typography**
```css
--font-display: 'Lora', 'Georgia', serif;
--font-script: 'Montserrat', sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### **Responsive Breakpoints**
- Desktop: Default styles
- Tablet: 768px and below
- Mobile: 480px and below

### **Deployment**

#### **Netlify Configuration**
- **Build:** Static files served from root
- **Functions:** `netlify/functions/`
- **Environment:** `WEDDING_PASSWORD` set in Netlify dashboard
- **Domain:** Custom domain configured in Netlify

#### **Environment Variables**
```bash
# .env (local development)
WEDDING_PASSWORD=your_production_password_here

# Netlify Dashboard
WEDDING_PASSWORD=<secure_production_password>
```

### **Testing Checklist**
- [ ] Password authentication works
- [ ] Mobile navigation hamburger menu
- [ ] Countdown timer updates
- [ ] RSVP form functionality
- [ ] Accommodation cards expand/collapse
- [ ] Responsive design on all breakpoints
- [ ] Smooth scrolling navigation

### **Common Tasks**

#### **Update Content**
- Wedding details: Edit `index.html`
- Styling: Edit `css/style.css` 
- Functionality: Edit `js/script.js`

#### **Change Password**
```bash
# Update local development
echo "WEDDING_PASSWORD=new_password" > .env

# Update production in Netlify Dashboard:
# Site settings → Environment variables → WEDDING_PASSWORD
```

#### **Deploy Changes**
```bash
git add .
git commit -m "Update wedding details"
git push origin main
# Auto-deploys to Netlify
```

### **Troubleshooting**

#### **Password Not Working**
- Check if using correct environment (local vs production)
- Verify Netlify function is deployed
- Check browser console for errors

#### **Mobile Issues**
- Test on actual devices, not just browser resize
- Check viewport meta tag in HTML
- Verify touch targets are 44px minimum

#### **Performance**
- Images should be optimized for web
- Test loading speeds on slow connections
- Monitor Netlify function cold starts

---

**Last Updated:** October 1, 2025  
**Next Review:** Before wedding deployment (Spring 2026)