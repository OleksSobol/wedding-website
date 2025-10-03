// Wedding RSVP Google Apps Script - Simplified Version
// Deploy as: Web App with "Anyone" access
// Form submits to hidden iframe, no redirect needed

// IMPORTANT: Replace with your actual Google Sheet ID
const SHEET_ID = '1eQ_q76OXooinrByTezDiEmz6oB1ConZ7QnfwcNNPxCo';
const SHEET_NAME = 'Sheet1';

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('Wedding RSVP API is working! Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    console.log('Received form submission:', e.parameter);
    
    // Extract data from form submission
    const data = {
      timestamp: e.parameter.timestamp || new Date().toISOString(),
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      attendance: e.parameter.attendance || '',
      guestCount: e.parameter.guestCount || '',
      additionalGuest: e.parameter.additionalGuest || '',
      dietaryRestrictions: e.parameter.dietaryRestrictions || '',
      songRequests: e.parameter.songRequests || '',
      specialMessage: e.parameter.specialMessage || ''
    };
    
    console.log('Processed RSVP data:', data);
    
    // Format the timestamp properly AFTER data is defined
    const formattedTimestamp = formatTimestamp(data.timestamp);
    
    // Get or create the sheet
    const sheet = getOrCreateSheet();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name', 
        'Email',
        'Attendance',
        'Guest Count',
        'Additional Guest',
        'Dietary Restrictions',
        'Song Requests',
        'Special Message'
      ]);
    }
    
    // Add the RSVP data with formatted timestamp
    sheet.appendRow([
      formattedTimestamp,  // Use the formatted timestamp here!
      data.name,
      data.email,
      data.attendance,
      data.guestCount,
      data.additionalGuest,
      data.dietaryRestrictions,
      data.songRequests,
      data.specialMessage
    ]);
    
    console.log('RSVP saved successfully to sheet');
    
    // Return simple success response (will be loaded in hidden iframe)
    return ContentService
      .createTextOutput(`SUCCESS: RSVP received for ${data.name}`)
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error processing RSVP:', error);
    
    // Return error response (will be loaded in hidden iframe)
    return ContentService
      .createTextOutput(`ERROR: ${error.toString()}`)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function getOrCreateSheet() {
  try {
    // Try to open existing sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    return sheet;
    
  } catch (error) {
    // If sheet doesn't exist, create a new one
    console.log('Creating new spreadsheet...');
    const spreadsheet = SpreadsheetApp.create('Wedding RSVPs - ' + new Date().toLocaleDateString());
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
    
    console.log('New spreadsheet created with ID:', spreadsheet.getId());
    console.log('Update your SHEET_ID constant with this ID!');
    
    return sheet;
  }
}

// Test functions you can run manually in the Apps Script editor
function testFormSubmission() {
  const testData = {
    parameter: {
      timestamp: new Date().toISOString(),
      name: 'Test Guest',
      email: 'test@example.com',
      attendance: 'yes',
      guestCount: '2',
      additionalGuest: 'Jane Doe',
      dietaryRestrictions: 'Vegetarian',
      songRequests: 'Dancing Queen',
      specialMessage: 'Congratulations!'
    }
  };
  
  console.log('🧪 Testing form submission...');
  const result = doPost(testData);
  console.log('✅ Test result:', result.getContent());
  
  return result;
}

function testSheetAccess() {
  try {
    console.log('📊 Testing Google Sheet access...');
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    console.log(`✅ Sheet access successful. Current rows: ${lastRow}`);
    return true;
  } catch (error) {
    console.error('❌ Sheet access failed:', error);
    return false;
  }
}

function clearTestData() {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Delete all rows except header
      sheet.deleteRows(2, lastRow - 1);
      console.log('✅ Test data cleared');
    }
  } catch (error) {
    console.error('❌ Error clearing test data:', error);
  }
}

/**
 * Format timestamp to readable format: "2025-10-03 14:33 - PDT"
 */
function formatTimestamp(isoTimestamp) {
  try {
    // Create date from ISO string or current time
    const date = isoTimestamp ? new Date(isoTimestamp) : new Date();
    
    // Format for PDT timezone (Pacific Daylight Time)
    const options = {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24-hour format
    };
    
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.formatToParts(date);
    
    // Extract parts
    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;
    
    // Check if we're in PDT or PST
    const isDST = isDaylightSavingTime(date);
    const timezone = isDST ? 'PDT' : 'PST';
    
    return `${year}-${month}-${day} ${hour}:${minute} - ${timezone}`;
    
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    // Fallback to basic format
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/**
 * Check if date is during Daylight Saving Time
 */
function isDaylightSavingTime(date) {
  // Get timezone offset in January (standard time) and July (daylight time)
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  
  // Get current timezone offset
  const currentOffset = date.getTimezoneOffset();
  const janOffset = jan.getTimezoneOffset();
  const julOffset = jul.getTimezoneOffset();
  
  // If current offset is different from January, we're in DST
  return currentOffset !== janOffset && currentOffset === julOffset;
}

/**
 * Test the timestamp formatting function
 */
function testTimestampFormatting() {
  console.log('Testing timestamp formatting...');
  
  // Test with current time
  const now = new Date().toISOString();
  const formatted = formatTimestamp(now);
  console.log(`Input: ${now}`);
  console.log(`Output: ${formatted}`);
  
  // Test with specific time
  const testTime = '2025-10-03T00:12:36.292Z';
  const testFormatted = formatTimestamp(testTime);
  console.log(`Input: ${testTime}`);
  console.log(`Output: ${testFormatted}`);
}