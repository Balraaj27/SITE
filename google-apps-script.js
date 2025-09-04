// Google Apps Script code for Law Crusade - Consultation Requests
// Deploy this as a web app to receive form submissions

function doPost(e) {
  try {
    // Better error handling for POST data
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST data received');
    }
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error('Missing required fields');
    }
    
    // Get or create the spreadsheet
    let spreadsheet;
    let sheet;
    
    try {
      // Try to get existing spreadsheet by name
      const files = DriveApp.getFilesByName('Law Crusade - Consultation Requests');
      if (files.hasNext()) {
        spreadsheet = SpreadsheetApp.open(files.next());
        sheet = spreadsheet.getActiveSheet();
      } else {
        throw new Error('Spreadsheet not found');
      }
    } catch (error) {
      // Create new spreadsheet if it doesn't exist
      spreadsheet = SpreadsheetApp.create('Law Crusade - Consultation Requests');
      sheet = spreadsheet.getActiveSheet();
      
      // Set up headers
      const headers = [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 
        'Legal Service', 'Urgency', 'Subject', 'Message', 
        'Preferred Date', 'Preferred Time', 'Consultation Type', 'Status'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#f1c40f');
      headerRange.setFontWeight('bold');
      headerRange.setFontColor('#2c3e50');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    }
    
    // Prepare row data
    const rowData = [
      new Date(), // Current timestamp
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.legalService || '',
      data.urgency || 'normal',
      data.subject || '',
      data.message || '',
      data.preferredDate || 'Not specified',
      data.preferredTime || 'Not specified',
      data.consultationType || 'in-person',
      'New' // Default status
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Consultation request saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving consultation request: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Law Crusade Consultation API is running',
      timestamp: new Date().toISOString(),
      version: '1.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify the script works
function testScript() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+91-9876543210',
    legalService: 'criminal',
    urgency: 'normal',
    subject: 'Test Consultation Request',
    message: 'This is a test message to verify the Google Sheets integration is working properly.',
    preferredDate: '2024-01-20',
    preferredTime: '10-11',
    consultationType: 'in-person'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  try {
    const result = doPost(mockEvent);
    console.log('Test result:', result.getContent());
    return result.getContent();
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

// Function to manually create the spreadsheet
function createSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.create('Law Crusade - Consultation Requests');
    const sheet = spreadsheet.getActiveSheet();
    
    // Set up headers
    const headers = [
      'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 
      'Legal Service', 'Urgency', 'Subject', 'Message', 
      'Preferred Date', 'Preferred Time', 'Consultation Type', 'Status'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#f1c40f');
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#2c3e50');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    console.log('Spreadsheet created successfully!');
    console.log('URL:', spreadsheet.getUrl());
    
    return spreadsheet.getUrl();
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    return 'Error: ' + error.toString();
  }
}