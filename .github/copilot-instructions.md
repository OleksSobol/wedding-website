# GitHub Copilot Instructions for Wedding Website# AI Agent Instructions - Wedding Website



## 🎯 Project OverviewThis document provides guidance for AI coding agents working in this static wedding website project.

This is a **secure wedding website** with:

- Password-protected access using Netlify serverless functions## Project Overview

- RSVP form that submits to Google Sheets via Google Apps Script

- Clean, responsive design with countdown timerThis is a static HTML/CSS/JavaScript wedding website that includes features such as:

- Environment variables for security- Password protected access for guests (client-side)

- Event details and schedule

## 🚨 CRITICAL RULES - NEVER BREAK THESE- Countdown timer to the wedding day

- RSVP management using Google Forms integration

### 1. KEEP IT SIMPLE- Section for guests to stay with multiple items that can be expand to read more

- **DON'T** overcomplicate solutions- Photo gallery with responsive design

- **DON'T** create unnecessary files or servers  - Modern, mobile-friendly user interface

- **DON'T** add complex frameworks when simple HTML/CSS/JS works- Easy deployment to GitHub Pages or similar static hosting

- **DO** fix the immediate issue and stop

## Repository Structure

### 2. SECURITY FIRST

- **NEVER** commit API keys, URLs, or passwords to git```

- **ALWAYS** use environment variables (.env) for sensitive datawedding-website/

- **CHECK** .gitignore before creating files with secrets├── .github/          # GitHub configuration and workflows

- **USE** placeholder values in committed code│   └── copilot-instructions.md  # This file

├── css/             # Stylesheets

### 3. NO FEATURE CREEP│   └── style.css    # Main stylesheet with responsive design

- **DON'T** add features not explicitly requested├── js/              # JavaScript files

- **DON'T** create "helpful" tools the user didn't ask for│   └── script.js    # Main functionality (password, countdown, animations)

- **FOCUS** on fixing the specific problem mentioned├── images/          # Image assets

- **ASK** before adding complexity│   └── (wedding photos, backgrounds, etc.)

├── index.html       # Main website file

### 4. FILE MANAGEMENT├── .gitignore       # Git ignore rules

- **DON'T** create files unless absolutely necessary└── README.md        # Project documentation

- **CLEAN UP** any mess you create immediately  ```

- **USE** existing patterns and structures

- **REMOVE** anything that doesn't work## Key Development Practices



## 📋 Current Architecture### Technology Stack

- **HTML5**: Semantic markup with accessibility in mind

### Core Files (DON'T BREAK THESE):- **CSS3**: Modern responsive design with CSS Grid and Flexbox

- `index.html` - Main website (password modal + content)- **Vanilla JavaScript**: No frameworks, lightweight and fast

- `css/style.css` - All styling- **Google Forms**: Embedded RSVP form for data collection

- `js/script.js` - Main functionality (auth + RSVP)- **Google Fonts**: Dancing Script and Playfair Display for typography

- `js/env.js` - Environment variable loader- **Static Hosting**: GitHub Pages, Netlify, or similar

- `netlify/functions/auth.js` - Password validation

- `google-apps-script.js` - Server-side RSVP handler### Development Workflow

To work on the website:

### Configuration:1. Clone the repository and navigate to the project directory

- `.env` - Local environment variables (not committed)2. Open `index.html` in a web browser or use a local server:

- `.env.example` - Template for environment setup   ```bash

- `config.local.js` - Development config (not committed)     # Using Python's built-in server

- `.gitignore` - Protects sensitive files   python -m http.server 8000

   # Or using Node.js

### Current Flow:   npx serve .

1. User enters password → Netlify function validates   ```

2. User fills RSVP form → Submits to Google Apps Script3. Edit files directly and refresh the browser to see changes

3. Google Apps Script writes to Google Sheets4. Test on different devices and browsers

4. Success message shown

### Code Organization Patterns

## 🔧 When User Reports Issues- **index.html**: Single-page application with sections:

  - Password protection modal

### Step 1: UNDERSTAND THE ACTUAL PROBLEM  - Hero section with countdown

- Read the error message carefully  - Wedding details

- Don't assume what they need  - RSVP form (Google Forms embed)

- Ask clarifying questions if unclear  - Photo gallery

- **css/style.css**: Organized with:

### Step 2: MINIMAL FIX  - CSS variables for theming

- Fix ONLY the reported issue  - Mobile-first responsive design

- Use existing code patterns  - Component-based styling

- Don't refactor working code  - Animations and transitions

- **js/script.js**: Modular functions for:

### Step 3: TEST THE FIX    - Password authentication

- Ensure the fix doesn't break existing functionality  - Countdown timer

- Keep changes minimal and focused  - Smooth scrolling navigation

- Stop when the issue is resolved  - Animation triggers

  - Form handling

## ❌ THINGS TO NEVER DO

### Customization Guide

1. **Create local testing servers** - User can test with dev tools1. **Password**: Change `PASSWORD` variable in `js/script.js`

2. **Add build processes** - This is a static site2. **Wedding Date**: Update date in countdown function

3. **Install unnecessary dependencies** - Keep it lightweight  3. **Couple Names**: Modify in `index.html` hero section

4. **Create multiple configuration systems** - One .env approach4. **Wedding Details**: Update ceremony/reception info in details section

5. **Overcomplicate authentication** - Netlify function works fine5. **RSVP Form**: Replace Google Forms embed URL with your form

6. **Add databases or APIs** - Google Sheets is the database6. **Colors**: Modify CSS variables in `:root` selector

7. **Create elaborate folder structures** - Keep it flat and simple7. **Photos**: Add images to `images/` folder and update gallery section



## ✅ PREFERRED SOLUTIONS### Deployment Options

- **GitHub Pages**: Enable in repository settings, deploys automatically (100GB soft limit)

1. **Use browser dev tools** for testing API changes- **Netlify**: Drag and drop deployment or connect to repository (100GB/month free)

2. **Environment variables** for all sensitive data- **Vercel**: Connect GitHub repository for automatic deployment (100GB/month free)

3. **Simple HTML/CSS/JS** - no frameworks needed- **Custom Domain**: Configure DNS to point to hosting provider

4. **Google Apps Script** for server-side Google Sheets access

5. **Netlify functions** for server-side operations### Hosting Provider Comparison for Wedding Sites

6. **Minimal code changes** to fix specific issues| Platform | Free Bandwidth | Functions | Database | Best For |

|----------|----------------|-----------|----------|----------|

## 🎯 Success Criteria| GitHub Pages | 100GB* | ❌ | ❌ | Simple static sites |

| Netlify | 100GB | ✅ | Add-on | Static + serverless |

- **Issue is fixed** with minimal code changes| Vercel | 100GB | ✅ | Add-on | Modern web apps |

- **No new complexity** introduced unnecessarily  | Firebase | 10GB | ✅ | ✅ | Real-time features |

- **Existing functionality** continues to work

- **Security practices** maintained (no exposed secrets)*Soft limit, rarely enforced for wedding sites

- **User can deploy** without configuration headaches

### Bandwidth Reality Check

## 🗣️ Communication Style- **100GB = 20,000+ visitors** for typical wedding sites

- **Wedding guest count:** Usually 100-300 people

- Be **direct and concise**- **Conclusion:** Free tiers are more than sufficient for wedding websites

- **Admit when you overcomplicated** things- **Cost if exceeded:** $20-40 per additional 100GB (extremely unlikely for weddings)

- **Focus on the user's specific need**

- **Don't suggest features** they didn't ask for## Integration Points

- Use **simple language** - avoid technical jargon- **Google Forms**: RSVP data collection and management

- **Google Analytics**: Add tracking code for visitor analytics

Remember: **The user wants their wedding website to work reliably, not a complex development project!**- **Social Media**: Open Graph tags for sharing
- **Email Integration**: Contact form can be added using services like Formspree
- **CDN**: Images can be hosted on Cloudinary or similar services

## Performance Considerations
- Optimize images (WebP format, proper sizing)
- Minimize CSS and JavaScript for production
- Use lazy loading for gallery images
- Implement service worker for offline functionality (optional)
- Monitor Core Web Vitals for user experience

## Bandwidth Optimization Guidelines

### Understanding Bandwidth for Wedding Sites
Wedding websites typically require minimal bandwidth compared to hosting provider limits:
- **Typical wedding site per visit:** 1-10MB (HTML + CSS + JS + images)
- **Expected traffic:** 100-300 guests × 2-5 visits = 500-1,500 monthly visits
- **Bandwidth usage:** Usually under 15GB/month (well within 100GB free limits)

### Image Optimization Strategies
1. **Compress images aggressively:**
   - Original photo: 3MB → Optimized: 300KB (90% reduction)
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   
2. **Modern image formats:**
   - WebP instead of JPEG/PNG (30-50% smaller file sizes)
   - SVG for icons, graphics, and simple illustrations
   - Progressive JPEG for large photos

3. **Responsive images:**
   ```html
   <img src="photo-800.webp" 
        srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"
        sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
        alt="Wedding photo">
   ```

### File Size Targets for Wedding Sites
- **Total page size:** < 2MB for good mobile experience
- **Individual photos:** 200-500KB max after optimization
- **CSS file:** < 50KB (minified)
- **JavaScript file:** < 100KB (minified)
- **Fonts:** Limit to 2-3 font families, subset when possible

### Bandwidth Monitoring
- Use browser DevTools Network tab to audit page size
- Test on 3G connection simulation for mobile experience
- Monitor hosting provider's bandwidth usage dashboard
- Set up alerts before reaching 80% of bandwidth limits

## Security Notes
- Password protection is client-side only (for convenience, not security)
- For true security, consider server-side authentication or hosting platforms with password protection
- HTTPS is recommended for any production deployment

## Git Workflow Guidelines
- **Commit After Approved Changes**: When the user approves changes made by the AI agent, always commit the changes with descriptive commit messages
- **Commit Message Format**: Use conventional commits format: `feat:`, `fix:`, `style:`, `docs:`, etc.
- **Descriptive Messages**: Include a comprehensive summary of all changes made in the commit message
- **File Staging**: Add only the files that were actually modified during the current request
- **Commit Timing**: Commit immediately after user confirms they want to keep the proposed changes

### Example Commit Process:
1. Make requested changes to files
2. User approves the changes
3. `git add <modified-files>`
4. `git commit -m "feat: descriptive message with bullet points of changes"`
5. Confirm commit was successful

---

This static approach provides simplicity, fast loading times, and easy maintenance while still delivering a beautiful and functional wedding website experience.