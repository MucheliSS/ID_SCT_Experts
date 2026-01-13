/**
 * TTSH ID MO SCT Expert Marking - Google Apps Script Backend
 * 
 * This script receives expert panel responses and stores them in a Google Sheet.
 * It also auto-calculates the scoring key using formulas in a second sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet for expert data collection
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy" and authorize the app
 * 9. Copy the Web App URL and paste it in index.html
 */

// Configuration
const RESPONSES_SHEET = 'Expert Responses';
const SCORING_KEY_SHEET = 'Scoring Key';

/**
 * Handle POST requests from expert marking interface
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let responsesSheet = ss.getSheetByName(RESPONSES_SHEET);
    
    // Create sheets if they don't exist
    if (!responsesSheet) {
      responsesSheet = ss.insertSheet(RESPONSES_SHEET);
      createResponseHeaders(responsesSheet);
    }
    
    // Append expert response
    const row = prepareRowData(data);
    responsesSheet.appendRow(row);
    
    // Update scoring key sheet
    updateScoringKey(ss);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Expert response saved',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
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
      status: 'OK',
      message: 'SCT Expert Marking Backend is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create headers for responses sheet
 */
function createResponseHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Expert Name',
    'Specialty',
    'Years Experience',
    'Time Taken (s)',
    // Items 1.1 through 10.3
    '1.1', '1.2', '1.3',
    '2.1', '2.2', '2.3',
    '3.1', '3.2', '3.3',
    '4.1', '4.2', '4.3',
    '5.1', '5.2', '5.3',
    '6.1', '6.2', '6.3',
    '7.1', '7.2', '7.3',
    '8.1', '8.2', '8.3',
    '9.1', '9.2', '9.3',
    '10.1', '10.2', '10.3'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#8b5cf6')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

/**
 * Prepare row data from submission
 */
function prepareRowData(data) {
  const itemIds = [
    '1.1', '1.2', '1.3',
    '2.1', '2.2', '2.3',
    '3.1', '3.2', '3.3',
    '4.1', '4.2', '4.3',
    '5.1', '5.2', '5.3',
    '6.1', '6.2', '6.3',
    '7.1', '7.2', '7.3',
    '8.1', '8.2', '8.3',
    '9.1', '9.2', '9.3',
    '10.1', '10.2', '10.3'
  ];
  
  const row = [
    new Date(data.timestamp),
    data.expert.name || '',
    data.expert.specialty || '',
    data.expert.yearsExperience || 0,
    data.timeTakenSeconds || 0
  ];
  
  // Add responses
  itemIds.forEach(id => {
    row.push(data.responses[id] || '');
  });
  
  return row;
}

/**
 * Update the Scoring Key sheet with calculated values
 */
function updateScoringKey(ss) {
  let keySheet = ss.getSheetByName(SCORING_KEY_SHEET);
  
  if (!keySheet) {
    keySheet = ss.insertSheet(SCORING_KEY_SHEET);
  } else {
    keySheet.clear();
  }
  
  const responsesSheet = ss.getSheetByName(RESPONSES_SHEET);
  const numExperts = responsesSheet.getLastRow() - 1; // Excluding header
  
  if (numExperts < 1) return;
  
  // Headers
  const headers = ['Item', 'Count -2', 'Count -1', 'Count 0', 'Count +1', 'Count +2', 
                   'Modal', 'Weight -2', 'Weight -1', 'Weight 0', 'Weight +1', 'Weight +2', 'Experts'];
  keySheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  keySheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#7c3aed')
    .setFontColor('#ffffff');
  
  const itemIds = [
    '1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3',
    '4.1', '4.2', '4.3', '5.1', '5.2', '5.3', '6.1', '6.2', '6.3',
    '7.1', '7.2', '7.3', '8.1', '8.2', '8.3', '9.1', '9.2', '9.3',
    '10.1', '10.2', '10.3'
  ];
  
  // Get all responses
  const dataRange = responsesSheet.getRange(2, 6, numExperts, 30); // Columns F onwards
  const allResponses = dataRange.getValues();
  
  const rows = [];
  
  itemIds.forEach((itemId, idx) => {
    const counts = { '-2': 0, '-1': 0, '0': 0, '+1': 0, '+2': 0 };
    
    allResponses.forEach(expertRow => {
      const response = String(expertRow[idx]).trim();
      if (counts.hasOwnProperty(response)) {
        counts[response]++;
      }
    });
    
    // Find modal
    let modal = '0';
    let maxCount = 0;
    Object.keys(counts).forEach(val => {
      if (counts[val] > maxCount) {
        maxCount = counts[val];
        modal = val;
      }
    });
    
    // Calculate weights
    const weights = {};
    Object.keys(counts).forEach(val => {
      weights[val] = maxCount > 0 ? (counts[val] / maxCount).toFixed(2) : 0;
    });
    
    rows.push([
      itemId,
      counts['-2'], counts['-1'], counts['0'], counts['+1'], counts['+2'],
      modal,
      weights['-2'], weights['-1'], weights['0'], weights['+1'], weights['+2'],
      numExperts
    ]);
  });
  
  keySheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  
  // Highlight modal column
  keySheet.getRange(2, 7, rows.length, 1).setFontWeight('bold');
  
  keySheet.setFrozenRows(1);
}

/**
 * Test function
 */
function testExpertSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    expert: {
      name: 'Test Expert',
      specialty: 'General ID',
      yearsExperience: 10
    },
    responses: {
      '1.1': '+2', '1.2': '-1', '1.3': '+1',
      '2.1': '-2', '2.2': '+2', '2.3': '-2',
      '3.1': '+2', '3.2': '-2', '3.3': '0',
      '4.1': '-2', '4.2': '+1', '4.3': '0',
      '5.1': '+2', '5.2': '-2', '5.3': '+2',
      '6.1': '+2', '6.2': '0', '6.3': '+2',
      '7.1': '+2', '7.2': '+1', '7.3': '+2',
      '8.1': '+2', '8.2': '+2', '8.3': '-2',
      '9.1': '+2', '9.2': '-2', '9.3': '+2',
      '10.1': '+2', '10.2': '-2', '10.3': '+1'
    },
    timeTakenSeconds: 1500
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}

/**
 * Manually trigger scoring key update
 */
function manualUpdateScoringKey() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  updateScoringKey(ss);
}
