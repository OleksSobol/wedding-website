/**
 * Guest photo/video uploader — Google Apps Script backend.
 * ----------------------------------------------------------------------------
 * This lets wedding guests upload to YOUR Google Drive WITHOUT a Google login.
 * The script holds your permissions; it mints a one-time "resumable upload"
 * link, and the guest's browser sends the file bytes straight to Google.
 *
 * ============================ ONE-TIME SETUP ===============================
 * 1. In Google Drive, create a folder for the uploads (e.g. "Wedding Uploads").
 *    Open it and copy the ID from the URL:
 *      drive.google.com/drive/folders/<THIS_PART_IS_THE_ID>
 *    Paste it into UPLOAD_ROOT_FOLDER_ID below.
 *
 * 2. Go to https://script.google.com → New project. Delete the sample code and
 *    paste THIS whole file in. Save.
 *
 * 3. Deploy → New deployment → type "Web app".
 *      - Description: Wedding uploads
 *      - Execute as: Me (your account)
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted (allow Drive access), and COPY the
 *    "Web app URL" that ends in /exec.
 *
 * 4. Paste that /exec URL into js/upload.js  →  GAS_UPLOAD_URL.
 *    Make sure SHARED_TOKEN below matches UPLOAD_TOKEN in js/upload.js.
 *
 * 5. Add your live site origin(s) to ALLOWED_ORIGINS below.
 * ===========================================================================
 */

// ▼▼▼ FILL THESE IN ▼▼▼
var UPLOAD_ROOT_FOLDER_ID = '1zwCQksLKkXl6lMlnEGlbmordzvebjkpv';
var SHARED_TOKEN = 'solstice2026'; // must match UPLOAD_TOKEN in js/upload.js
var ALLOWED_ORIGINS = [
  'https://solstice2026.party',
  'https://www.solstice2026.party'
];
// ▲▲▲ FILL THESE IN ▲▲▲

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.token !== SHARED_TOKEN) {
      return json({ success: false, error: 'Unauthorized' });
    }
    if (!body.fileName) {
      return json({ success: false, error: 'Missing fileName' });
    }

    // Only honor origins we trust (controls who Google will accept the
    // browser upload from). Falls back to the first allowed origin.
    var origin = ALLOWED_ORIGINS.indexOf(body.origin) !== -1
      ? body.origin
      : ALLOWED_ORIGINS[0];

    var folder = getGuestFolder(body.guestName);
    var metadata = {
      name: body.fileName,
      parents: [folder.getId()],
      mimeType: body.mimeType || 'application/octet-stream'
    };

    var resp = UrlFetchApp.fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true',
      {
        method: 'post',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
          // Associating the session with the browser's origin is what lets the
          // guest's browser PUT the bytes directly (CORS).
          Origin: origin
        },
        payload: JSON.stringify(metadata),
        muteHttpExceptions: true
      }
    );

    var headers = resp.getAllHeaders();
    var sessionUrl = headers['Location'] || headers['location'];
    if (!sessionUrl) {
      return json({
        success: false,
        error: 'Could not start upload session',
        detail: resp.getContentText()
      });
    }

    return json({ success: true, sessionUrl: sessionUrl });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

// Each guest gets their own subfolder, named after what they typed.
function getGuestFolder(guestName) {
  var root = DriveApp.getFolderById(UPLOAD_ROOT_FOLDER_ID);
  var clean = String(guestName || 'Anonymous')
    .replace(/[^\w\s\-]/g, '')
    .trim()
    .slice(0, 60) || 'Anonymous';
  var existing = root.getFoldersByName(clean);
  return existing.hasNext() ? existing.next() : root.createFolder(clean);
}

// Simple health check when you open the /exec URL in a browser.
function doGet() {
  return json({ success: true, status: 'Wedding upload endpoint is live' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
