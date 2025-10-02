# 📋 Google Forms/Sheets Integration Setup Guide

## Step 1: Create Your Google Form

1. **Go to Google Forms:**
   - Visit [forms.google.com](https://forms.google.com)
   - Click "Create" or "+"
   - Title: "Catherine & Oleksandr Wedding RSVP"

2. **Add These Questions (in exact order):**

   **Question 1: Guest Name**
   - Type: Short answer
   - Required: Yes
   - Question: "Full Name"

   **Question 2: Email Address**
   - Type: Short answer
   - Required: Yes
   - Question: "Email Address"

   **Question 3: Attendance**
   - Type: Multiple choice
   - Required: Yes
   - Question: "Will you be attending?"
   - Options:
     - Yes, can't wait! 🎉
     - Sorry, can't make it 😢

   **Question 4: Guest Count**
   - Type: Multiple choice
   - Required: No
   - Question: "Total Guests (including yourself)"
   - Options:
     - 1 Guest (just me)
     - 2 Guests (me + 1)

   **Question 5: Plus One Name**
   - Type: Short answer
   - Required: No
   - Question: "Name of Your Guest"

   **Question 6: Dietary Restrictions**
   - Type: Checkboxes
   - Required: No
   - Question: "Dietary Restrictions & Food Allergies"
   - Options:
     - Gluten-Free
     - Vegetarian
     - Vegan
     - Dairy-Free
     - Nut Allergy
     - Pescatarian
     - Shellfish Allergy
     - Other

   **Question 7: Other Dietary Details**
   - Type: Short answer
   - Required: No
   - Question: "Please specify other dietary needs"

   **Question 8: Song Requests**
   - Type: Short answer
   - Required: No
   - Question: "Song Requests for the Reception"

   **Question 9: Special Message**
   - Type: Paragraph
   - Required: No
   - Question: "Special Message for Catherine & Oleksandr"

## Step 2: Get Your Form URL and Field IDs

1. **Get Form URL:**
   - Click "Send" button in your form
   - Click the link icon 🔗
   - Copy the URL (looks like: `https://docs.google.com/forms/d/FORM_ID_HERE/viewform`)
   - Save the `FORM_ID_HERE` part

2. **Get Field IDs:**
   - Open your form link in a new tab
   - Right-click anywhere → "View Page Source"
   - Press Ctrl+F (Cmd+F on Mac)
   - Search for `entry.`
   - You'll see entries like `entry.123456789`, `entry.987654321`, etc.
   - **Write down each field ID in order** (there should be 9 total)

## Step 3: Update Your Website Code

Open `/js/script.js` and find the `FORM_FIELD_IDS` section around line 485.

Replace these values with YOUR actual field IDs:

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse';

const FORM_FIELD_IDS = {
    guestName: 'entry.YOUR_FIRST_FIELD_ID',        // Guest Name field ID
    guestEmail: 'entry.YOUR_SECOND_FIELD_ID',      // Email field ID  
    attendance: 'entry.YOUR_THIRD_FIELD_ID',       // Attendance field ID
    guestCount: 'entry.YOUR_FOURTH_FIELD_ID',      // Guest count field ID
    plusOneName: 'entry.YOUR_FIFTH_FIELD_ID',      // Plus one name field ID
    dietaryRestrictions: 'entry.YOUR_SIXTH_FIELD_ID',  // Dietary restrictions field ID
    otherDietary: 'entry.YOUR_SEVENTH_FIELD_ID',   // Other dietary field ID
    songRequests: 'entry.YOUR_EIGHTH_FIELD_ID',    // Song requests field ID
    specialMessage: 'entry.YOUR_NINTH_FIELD_ID'    // Special message field ID
};
```

**Important:** 
- Replace `YOUR_ACTUAL_FORM_ID` with your Google Form ID
- Replace each `entry.YOUR_X_FIELD_ID` with the actual entry IDs from your form
- The URL should end with `/formResponse` not `/viewform`

## Step 4: Link to Google Sheets

1. **Open your Google Form**
2. **Click "Responses" tab**
3. **Click the Google Sheets icon** (green spreadsheet icon)
4. **Create new spreadsheet** or select existing one
5. **All RSVP responses will now go to this spreadsheet automatically!**

## Step 5: Set Up Email Notifications (Optional)

1. **In your Google Sheets:**
2. **Click "Tools" → "Notification rules"**
3. **Set up email notification when:**
   - "Any changes are made"
   - Send to: your email address
   - Frequency: "Right away"

Now you'll get an email every time someone RSVPs!

## Step 6: Test Your Setup

1. **Save your changes to `/js/script.js`**
2. **Deploy your website**
3. **Fill out your RSVP form**
4. **Check your Google Sheets** - the response should appear
5. **If it doesn't work, double-check your field IDs**

## 🎯 Example of What Your Field IDs Might Look Like:

After viewing your form source, you might find:
```javascript
const FORM_FIELD_IDS = {
    guestName: 'entry.1234567890',
    guestEmail: 'entry.0987654321', 
    attendance: 'entry.1122334455',
    guestCount: 'entry.5566778899',
    plusOneName: 'entry.9988776655',
    dietaryRestrictions: 'entry.4433221100',
    otherDietary: 'entry.1357924680',
    songRequests: 'entry.2468013579',
    specialMessage: 'entry.8642097531'
};
```

## 🔧 Troubleshooting:

**Problem:** Responses not appearing in Google Sheets
- **Check:** Field IDs are correct
- **Check:** Form URL ends with `/formResponse`
- **Check:** Google Form is linked to a spreadsheet

**Problem:** Some fields are empty in the spreadsheet
- **Check:** Field ID mapping matches question order
- **Check:** Required fields are actually required in Google Form

**Problem:** Form submission appears to fail
- **Remember:** `no-cors` mode means we can't detect success/failure
- **Check:** Google Sheets to see if data actually arrived

## 💰 Cost: 100% FREE
- Google Forms: Free
- Google Sheets: Free  
- No limits for typical wedding RSVPs

That's it! Your beautiful form will now submit to Google Sheets automatically. 🎉