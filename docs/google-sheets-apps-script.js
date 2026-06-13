/**
 * Reconnect — website leads → Google Sheet
 * ============================================================================
 * Receives form submissions from the website (contact form, assessment wizard,
 * newsletter) and appends one row per submission to a "Leads" tab. Headers are
 * created automatically on the first submission.
 *
 * ── SETUP (one time) ───────────────────────────────────────────────────────
 *  1. Open the leads spreadsheet:
 *     https://docs.google.com/spreadsheets/d/1cK5rErFfU4cq2ru09qWIRTlYbYrpgOsQU5b2-kHMeKU/edit
 *  2. Extensions ▸ Apps Script. Delete any boilerplate and paste THIS file.
 *  3. Click Save.
 *  4. Deploy ▸ New deployment ▸ (gear) Web app.
 *        • Description:    Reconnect leads
 *        • Execute as:     Me
 *        • Who has access: Anyone
 *     ▸ Deploy ▸ authorise the script when prompted.
 *  5. Copy the "Web app URL" (ends with /exec).
 *  6. Put that URL in the site env var NEXT_PUBLIC_LEADS_ENDPOINT
 *     (Vercel ▸ Project ▸ Settings ▸ Environment Variables, and in the
 *     GitHub Pages build env). Redeploy. Done.
 *
 *  To test: visit the /exec URL in a browser — you should see
 *  {"ok":true,"status":"Reconnect leads endpoint is live."}
 *
 *  NOTE: after editing this script you must redeploy (Deploy ▸ Manage
 *  deployments ▸ edit ▸ Version: New version) for changes to take effect.
 * ============================================================================
 */

// Column order. [ sheet header , payload key sent by the website ]
var FIELDS = [
  ['Timestamp',           '__timestamp'],
  ['Source',              'source'],
  ['Name',                'name'],
  ['Email',               'email'],
  ['Phone',               'phone'],
  ['Concern',             'concern'],
  ['Preferred Track',     'track'],
  ['Message',             'message'],
  ['Severity',            'severity'],
  ['Pain (0-10)',         'pain'],
  ['Duration',            'duration'],
  ['Activity Level',      'activity'],
  ['Training Experience', 'experience'],
  ['Age Band',            'ageBand'],
  ['Current Treatment',   'treatment'],
  ['Imaging',             'imaging'],
  ['Diet',                'diet'],
  ['Recommended Track',   'recommendedTrack'],
  ['Page',                'page'],
  ['User Agent',          'userAgent'],
];

var SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    data.__timestamp = new Date();
    var sheet = getSheet_();
    var row = FIELDS.map(function (f) {
      var v = data[f[1]];
      return (v === undefined || v === null) ? '' : v;
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, status: 'Reconnect leads endpoint is live.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    var headers = FIELDS.map(function (f) { return f[0]; });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
