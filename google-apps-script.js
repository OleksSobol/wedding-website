/**
 * Google Apps Script for Wedding RSVP Form Submission
 * 
 * This script receives form data from your wedding website and saves it to a Google Sheet.
 * It's much more reliable than trying to use Google Sheets API directly from the frontend.
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this code
 * 4. Update the SHEET_ID constant below with your Google Sheet ID
 * 5. Deploy as a Web App with "Anyone" access
 * 6. Copy the Web App URL to your website's GOOGLE_SCRIPT_CONFIG
 */

// Configuration - Replace with your actual Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

/**
 * Handle POST requests from the wedding website
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data (for debugging)
    console.log('Received RSVP data:', data);
    
    // Get the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data (matching the column order in your sheet)
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.attendance || '',
      data.guestCount || '',
      data.additionalGuest || '',
      data.dietaryRestrictions || '',
      data.songRequests || '',
      data.specialMessage || ''
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Log success
    console.log('Successfully added RSVP to sheet:', rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP submitted successfully',
        timestamp: data.timestamp,
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error processing RSVP:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to submit RSVP'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Wedding RSVP Google Apps Script is running!',
      timestamp: new Date().toISOString(),
      sheetId: SHEET_ID
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * Run this function in the Apps Script editor to test
 */
function testRSVPSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    attendance: 'yes',
    guestCount: '2',
    additionalGuest: 'Test Plus One',
    dietaryRestrictions: 'Vegetarian',
    songRequests: 'Test Song',
    specialMessage: 'Test message'
  };
  
  // Simulate a POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}