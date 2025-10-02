# Wedding Website# 💒 Catherine & Oleksandr's Wedding Website



A secure wedding website with password protection and Google Sheets RSVP integration.> **June 20, 2026** | [solstice2026.party](https://solstice2026.party)



## 🚀 Quick SetupA beautiful, password-protected wedding website built with modern web technologies and deployed on Netlify.



### 1. Local Development![Wedding Website](https://img.shields.io/badge/Wedding-June%2020%2C%202026-f7f9f7?style=for-the-badge&labelColor=7a8471)

```bash![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00ad9f?style=for-the-badge&logo=netlify)

# Test locally with Netlify![Responsive](https://img.shields.io/badge/Design-Responsive-a8b8a0?style=for-the-badge&logo=css3)

npm run dev

# Opens at http://localhost:8888## 🌿 Features

```

- 🔐 **Secure Password Protection** - Serverless authentication with Netlify Functions

### 2. Configure RSVP (Google Sheets Integration)- 📱 **Mobile-First Design** - Responsive across all devices

- ⏱️ **Live Countdown Timer** - Real-time countdown to the wedding day

**Step A: Create Google Sheet**- 🎨 **Sage Green Theme** - Elegant, romantic color palette

1. Create a new Google Sheet- 📝 **RSVP Management** - Interactive guest response system

2. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`- 🏨 **Accommodation Guide** - Expandable hotel information cards

- 📸 **Photo Gallery** - Beautiful image showcase

**Step B: Deploy Google Apps Script**  - 🧭 **Smooth Navigation** - Seamless scrolling between sections

1. Go to [script.google.com](https://script.google.com)

2. Create new project## 🚀 Quick Start

3. Paste code from `google-apps-script.js`

4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID (line 16)### Prerequisites

5. Deploy as Web App with "Anyone" access- Node.js (for Netlify CLI)

6. Copy the Web App URL- Git

- Modern web browser

**Step C: Update Website**

1. Open `js/script.js`### Local Development

2. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL (line 480)```bash

# Clone the repository

### 3. Set Wedding Passwordgit clone https://github.com/OleksSobol/wedding-website.git

```bashcd wedding-website

# Edit .env file

WEDDING_PASSWORD=your-secret-password# Set up environment

```cp .env.example .env



### 4. Deploy to Production# Start development server

python3 -m http.server 8000

**Netlify:**# OR with full serverless functions

1. Push to GitHubnetlify dev

2. Connect repo to Netlify

3. Set environment variable: `WEDDING_PASSWORD`# Visit http://localhost:8000

4. Deploy automatically# Password: [Set via WEDDING_PASSWORD environment variable]

```

**Other platforms:**

- Upload all files except `.env`, `.git`, `node_modules`## 🛠️ Tech Stack

- Ensure serverless functions are supported

| Technology | Purpose |

## 🎯 Project Structure|------------|---------|

```| **HTML5/CSS3/JavaScript** | Frontend foundation |

├── index.html                 # Main website| **Netlify Functions** | Serverless authentication |

├── css/style.css             # Styling  | **Netlify Hosting** | Static site deployment |

├── js/script.js              # Functionality| **Cloudflare DNS** | Domain management |

├── netlify/functions/auth.js # Password validation| **GitHub Actions** | Version control |

├── google-apps-script.js     # Google Sheets integration

└── .env                      # Local password (not committed)## 🎨 Design System

```

### Color Palette

## 🔧 Configuration Files```css

--primary-blush: #f7f9f7    /* Light sage background */

- **Password:** Set in `.env` or Netlify environment variables--secondary-rose: #a8b8a0   /* Sage green accents */

- **Google Apps Script URL:** Update in `js/script.js` line 480  --romantic-pink: #7a8471    /* Dark sage headers */

- **Google Sheet ID:** Update in `google-apps-script.js` line 16--accent-gold: #b8860b      /* Gold highlights */

- **Wedding Details:** Customize in `index.html`--charcoal: #2d3436         /* Text color */

```

## 🎉 That's It!

### Typography

Your wedding website is ready to go. Keep it simple and it will work reliably!- **Headings**: Lora (serif)
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
WEDDING_PASSWORD=your_development_password_here

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