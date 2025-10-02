# Google Sheets API Setup Guide 📊

## Why Google Sheets API is Better than Google Forms

✅ **Reliable** - Proper API with predictable behavior  
✅ **Real-time** - Data appears instantly in your sheet  
✅ **Error Handling** - Get actual error messages when something goes wrong  
✅ **No Breaking** - Won't break when Google updates their forms interface  
✅ **Flexible** - Easy to add/remove fields or change data structure  

## Step 1: Create Your Google Sheet 📋

1. **Go to [Google Sheets](https://sheets.google.com)**
2. **Create a new spreadsheet**
3. **Name it**: "Wedding RSVP Responses" (or whatever you prefer)
4. **Set up headers in row 1**:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Guest Name | Email | Attendance | Guest Count | Plus One | Dietary Restrictions | Song Requests | Special Message |

5. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
                                         ↑ This part ↑
   ```

## Step 2: Set Up Google Cloud Console 🔑

### 2.1 Create/Select Project
1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create a new project** or select existing one
3. **Name it**: "Wedding Website" or similar

### 2.2 Enable Google Sheets API
1. **Go to "APIs & Services" → "Library"**
2. **Search for "Google Sheets API"**
3. **Click on it and hit "Enable"**

### 2.3 Create API Key
1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "API Key"**
3. **Copy the API key** (starts with `AIza...`)
4. **Click "Restrict Key" for security**:
   - **API restrictions**: Select "Google Sheets API"
   - **Application restrictions**: 
     - Select "HTTP referrers"
     - Add your domain: `https://your-wedding-site.netlify.app/*`
     - Add localhost for testing: `http://localhost:*`

## Step 3: Make Your Sheet Accessible 🔓

You have two options:

### Option A: Public Sheet (Easier)
1. **In your Google Sheet, click "Share"**
2. **Change access to "Anyone with the link can view"**
3. **Make sure "Editor" is NOT selected** (security risk)

### Option B: Service Account (More Secure)
1. **In Google Cloud Console**: "APIs & Services" → "Credentials"
2. **Create Credentials** → "Service Account"
3. **Download the JSON key file**
4. **Share your sheet with the service account email**

**For simplicity, we'll use Option A for now.**

## Step 4: Update Your Code Configuration 💻

Open your `js/script.js` file and update these values:

```javascript
const SHEETS_CONFIG = {
    SHEET_ID: 'YOUR_ACTUAL_SHEET_ID_HERE',     // ← Paste your Sheet ID here
    API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',       // ← Paste your API key here
    RANGE: 'Sheet1!A:I' // This should stay the same
};
```

## Step 5: Test Your Setup 🧪

1. **Save your changes and deploy**
2. **Open your website**
3. **Fill out the RSVP form**
4. **Check the browser console** for debug messages
5. **Check your Google Sheet** - data should appear instantly!

## Troubleshooting 🔧

### Error: "API key not valid"
- Check that the API key is correct
- Verify that Google Sheets API is enabled
- Check API key restrictions match your domain

### Error: "The caller does not have permission"
- Make sure your Google Sheet is shared publicly
- Or set up proper service account permissions

### Error: "Quota exceeded"
- Google Sheets API has generous free limits
- Check Google Cloud Console for quota usage

### Data not appearing
- Check browser console for error messages
- Verify Sheet ID is correct
- Make sure the sheet name is "Sheet1" or update the RANGE

## What Happens Now ✨

When someone submits your RSVP form:

1. **Form data is collected** from your website
2. **Sent directly to Google Sheets API** (bypassing Forms entirely)
3. **Data appears instantly** in your spreadsheet
4. **You get real-time notifications** (if you set up Google Sheets notifications)
5. **Easy to analyze** with built-in Google Sheets features

## Security Notes 🔒

- **API Key**: Restricted to your domain and Google Sheets API only
- **Sheet Access**: Set to view-only public access (not edit)
- **Data Validation**: Your website validates data before sending
- **No Personal Data Exposure**: API key only allows appending data, not reading

---

**Need help?** Check the browser console for detailed error messages, or refer to the [Google Sheets API documentation](https://developers.google.com/sheets/api).