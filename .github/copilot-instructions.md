# AI Agent Instructions - Wedding Website

This document provides guidance for AI coding agents working in this static wedding website project.

## Project Overview

This is a static HTML/CSS/JavaScript wedding website that includes features such as:
- Password protected access for guests (client-side)
- Event details and schedule
- Countdown timer to the wedding day
- RSVP management using Google Forms integration
- Section for guests to stay with multiple items that can be expand to read more
- Photo gallery with responsive design
- Modern, mobile-friendly user interface
- Easy deployment to GitHub Pages or similar static hosting

## Repository Structure

```
wedding-website/
├── .github/          # GitHub configuration and workflows
│   └── copilot-instructions.md  # This file
├── css/             # Stylesheets
│   └── style.css    # Main stylesheet with responsive design
├── js/              # JavaScript files
│   └── script.js    # Main functionality (password, countdown, animations)
├── images/          # Image assets
│   └── (wedding photos, backgrounds, etc.)
├── index.html       # Main website file
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## Key Development Practices

### Technology Stack
- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Google Forms**: Embedded RSVP form for data collection
- **Google Fonts**: Dancing Script and Playfair Display for typography
- **Static Hosting**: GitHub Pages, Netlify, or similar

### Development Workflow
To work on the website:
1. Clone the repository and navigate to the project directory
2. Open `index.html` in a web browser or use a local server:
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   # Or using Node.js
   npx serve .
   ```
3. Edit files directly and refresh the browser to see changes
4. Test on different devices and browsers

### Code Organization Patterns
- **index.html**: Single-page application with sections:
  - Password protection modal
  - Hero section with countdown
  - Wedding details
  - RSVP form (Google Forms embed)
  - Photo gallery
- **css/style.css**: Organized with:
  - CSS variables for theming
  - Mobile-first responsive design
  - Component-based styling
  - Animations and transitions
- **js/script.js**: Modular functions for:
  - Password authentication
  - Countdown timer
  - Smooth scrolling navigation
  - Animation triggers
  - Form handling

### Customization Guide
1. **Password**: Change `PASSWORD` variable in `js/script.js`
2. **Wedding Date**: Update date in countdown function
3. **Couple Names**: Modify in `index.html` hero section
4. **Wedding Details**: Update ceremony/reception info in details section
5. **RSVP Form**: Replace Google Forms embed URL with your form
6. **Colors**: Modify CSS variables in `:root` selector
7. **Photos**: Add images to `images/` folder and update gallery section

### Deployment Options
- **GitHub Pages**: Enable in repository settings, deploys automatically (100GB soft limit)
- **Netlify**: Drag and drop deployment or connect to repository (100GB/month free)
- **Vercel**: Connect GitHub repository for automatic deployment (100GB/month free)
- **Custom Domain**: Configure DNS to point to hosting provider

### Hosting Provider Comparison for Wedding Sites
| Platform | Free Bandwidth | Functions | Database | Best For |
|----------|----------------|-----------|----------|----------|
| GitHub Pages | 100GB* | ❌ | ❌ | Simple static sites |
| Netlify | 100GB | ✅ | Add-on | Static + serverless |
| Vercel | 100GB | ✅ | Add-on | Modern web apps |
| Firebase | 10GB | ✅ | ✅ | Real-time features |

*Soft limit, rarely enforced for wedding sites

### Bandwidth Reality Check
- **100GB = 20,000+ visitors** for typical wedding sites
- **Wedding guest count:** Usually 100-300 people
- **Conclusion:** Free tiers are more than sufficient for wedding websites
- **Cost if exceeded:** $20-40 per additional 100GB (extremely unlikely for weddings)

## Integration Points
- **Google Forms**: RSVP data collection and management
- **Google Analytics**: Add tracking code for visitor analytics
- **Social Media**: Open Graph tags for sharing
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