# 🧪 Local Testing Guide

## Quick Start: Test Locally

### 1. Start Local Server
```bash
# Option 1: Python (if you have Python installed)
cd /Users/olekssobol/workspace/wedding-website
python3 -m http.server 8080

# Option 2: Node.js serve (if you have Node.js)
npx serve . -p 8080

# Option 3: VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

### 2. Open in Browser
```
http://localhost:8080
```

### 3. Test the RSVP Form
1. Enter password to access the site
2. Scroll to RSVP section
3. Fill out the form completely
4. Submit and watch the browser console (F12)

## 🔍 What You'll See Locally

### Console Output Example:
```
📋 RSVP Submission Debug Info:
Original form data: {name: "Test User", email: "test@example.com", ...}
Google Form mappings:
  entry.877086558: "Test User"
  entry.1991096355: "test@example.com"
  entry.777001254: "Yes, can't wait! 🎉"
  ...
🚀 Submitting to: https://docs.google.com/forms/u/0/d/e/1FAIpQLSdXL5A0bYCJz-3KRkiXT1mhKfGxQMrshZ9GIHLzWMtLRCI_LQ/formResponse
🏠 LOCAL TESTING MODE: Simulating Google Forms submission...
✅ LOCAL TEST: Form data would be submitted successfully!
💡 To test actual submission, deploy to your domain
```

### Local Storage Check:
```javascript
// In browser console, run:
displayRSVPList()
// This shows all submitted RSVPs stored locally
```

## 🚀 Testing Real Submission

### Option 1: Deploy to Netlify
```bash
# If you have Netlify CLI
netlify deploy
netlify deploy --prod  # for production
```

### Option 2: Deploy via Git Push
```bash
git add .
git commit -m "Updated Google Forms integration"
git push origin main
# Auto-deploys to https://solstice2026.party
```

### Option 3: Manual Netlify Deploy
1. Go to https://app.netlify.com
2. Drag your `wedding-website` folder to deploy
3. Test on the live URL

## 🎯 What to Test

### ✅ Local Testing Checklist:
- [ ] Form validation works
- [ ] Dietary restrictions checkboxes work
- [ ] Guest count toggles work correctly
- [ ] "Other" dietary input appears/hides
- [ ] Success message displays
- [ ] Console shows correct field mappings
- [ ] Local storage saves data

### ✅ Live Testing Checklist:
- [ ] All local tests pass
- [ ] Form actually submits to Google Forms
- [ ] Check Google Form responses tab
- [ ] Verify data appears correctly in Google Sheets (if connected)

## 🔧 Debug Commands

### View All Local RSVPs:
```javascript
displayRSVPList()
```

### Clear Local Data:
```javascript
localStorage.removeItem('wedding-rsvps')
```

### Test Specific Features:
```javascript
// Test attendance toggle
toggleGuestCount()

// Test dietary restrictions
toggleOtherDietary()
```

## 🚨 Common Issues

### Local CORS Error:
- **Expected behavior** - Google Forms blocks direct local access
- **Solution**: Deploy to test real submission

### Form Not Submitting:
- Check console for errors
- Verify all required fields filled
- Check network tab for request details

### Missing Data:
- Check field ID mappings in console
- Verify form element names match JavaScript

---

**Recommendation**: Start with local testing to verify UI/UX, then deploy for full Google Forms integration testing! 🎉