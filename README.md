# 💒 Catherine & Oleksandr's Wedding Website

> **June 20, 2026** | [solstice2026.party](https://solstice2026.party)

A beautiful, password-protected wedding website built with modern web technologies and deployed on Netlify.

![Wedding Website](https://img.shields.io/badge/Wedding-June%2020%2C%202026-f7f9f7?style=for-the-badge&labelColor=7a8471)
![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00ad9f?style=for-the-badge&logo=netlify)
![Responsive](https://img.shields.io/badge/Design-Responsive-a8b8a0?style=for-the-badge&logo=css3)

## 🌿 Features

- 🔐 **Secure Password Protection** - Serverless authentication with Netlify Functions
- 📱 **Mobile-First Design** - Responsive across all devices
- ⏱️ **Live Countdown Timer** - Real-time countdown to the wedding day
- 🎨 **Sage Green Theme** - Elegant, romantic color palette
- 📝 **RSVP Management** - Interactive guest response system
- 🏨 **Accommodation Guide** - Expandable hotel information cards
- 📸 **Photo Gallery** - Beautiful image showcase
- 🧭 **Smooth Navigation** - Seamless scrolling between sections

## 🚀 Quick Start

### Prerequisites
- Node.js (for Netlify CLI)
- Git
- Modern web browser

### Local Development
```bash
# Clone the repository
git clone https://github.com/OleksSobol/wedding-website.git
cd wedding-website

# Set up environment
cp .env.example .env

# Start development server
python3 -m http.server 8000
# OR with full serverless functions
netlify dev

# Visit http://localhost:8000
# Password: DevTesting2026
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5/CSS3/JavaScript** | Frontend foundation |
| **Netlify Functions** | Serverless authentication |
| **Netlify Hosting** | Static site deployment |
| **Cloudflare DNS** | Domain management |
| **GitHub Actions** | Version control |

## 🎨 Design System

### Color Palette
```css
--primary-blush: #f7f9f7    /* Light sage background */
--secondary-rose: #a8b8a0   /* Sage green accents */
--romantic-pink: #7a8471    /* Dark sage headers */
--accent-gold: #b8860b      /* Gold highlights */
--charcoal: #2d3436         /* Text color */
```

### Typography
- **Headings**: Lora (serif)
- **Display**: Montserrat (sans-serif) 
- **Body**: Inter (system fonts)

### Responsive Breakpoints
- 📱 **Mobile**: 480px and below
- 📱 **Tablet**: 768px and below
- 💻 **Desktop**: 769px and above

## 🔐 Authentication System

The website uses secure serverless authentication:

- **Development**: Fallback password in JavaScript
- **Production**: Netlify Function with environment variables
- **Security**: No passwords stored in client-side code
- **Session**: JWT-like tokens with expiration

## 📂 Project Structure

```
wedding-website/
├── css/
│   └── style.css              # Responsive sage green styling
├── js/
│   └── script.js              # Authentication + interactive features
├── netlify/
│   └── functions/
│       └── auth.js            # Serverless authentication
├── index.html                 # Main wedding website
├── netlify.toml              # Netlify deployment config
├── DEVELOPMENT.md            # Detailed development guide
└── README.md                 # This file
```

## 🚀 Deployment

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Platform**: Netlify
- **Domain**: [solstice2026.party](https://solstice2026.party)
- **SSL**: Auto-provisioned via Netlify + Cloudflare

### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

## 📋 Development

### Key Commands
```bash
# Start local development
python3 -m http.server 8000

# Test with serverless functions
netlify dev

# Commit changes (use simple messages!)
git add .
git commit -m "Add new feature"
git push origin main
```

### Environment Variables
```bash
# Local (.env)
WEDDING_PASSWORD=DevTesting2026

# Production (Netlify Dashboard)
WEDDING_PASSWORD=<secure_production_password>
```

## 🧪 Testing Checklist

- [ ] Password authentication works
- [ ] Mobile hamburger menu toggles
- [ ] Countdown timer updates every second  
- [ ] All navigation links scroll smoothly
- [ ] RSVP form validates input
- [ ] Accommodation cards expand/collapse
- [ ] Responsive design on all screen sizes
- [ ] SSL certificate is valid

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a private wedding website. For development questions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## 📄 License

Private project for Catherine & Oleksandr's wedding. All rights reserved.

## 💕 About

Created with love for Catherine & Oleksandr's wedding celebration on June 20, 2026. This website serves as a central hub for wedding information, guest management, and sharing our special day with family and friends.

---

**Built with 💚 using modern web technologies**  
*Last updated: October 2025*