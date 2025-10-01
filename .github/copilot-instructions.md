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
- **GitHub Pages**: Enable in repository settings, deploys automatically
- **Netlify**: Drag and drop deployment or connect to repository
- **Vercel**: Connect GitHub repository for automatic deployment
- **Custom Domain**: Configure DNS to point to hosting provider

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

## Security Notes
- Password protection is client-side only (for convenience, not security)
- For true security, consider server-side authentication or hosting platforms with password protection
- HTTPS is recommended for any production deployment

---

This static approach provides simplicity, fast loading times, and easy maintenance while still delivering a beautiful and functional wedding website experience.