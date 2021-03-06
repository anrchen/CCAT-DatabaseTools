const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const event = require("../../tools/event");
var path = require('path'),
    CREDENTIALS = path.join(__dirname, '/json/credentials.json'),
    TOKEN_PATH = path.join(__dirname, '/json/token.json');

// If modifying scopes, delete token.json
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// const spreadsheetId = '14wK9zbYsICMjhOopinXMEA3WU8KKe190U-_XWNnKbIA';
const spreadsheetId = '1oReZKr5MIu1qsFI_1fLe0AWy9rDhpAocipErvSYmGlc';
// Manage manual data

class googleSheetAPI {
  constructor(spreadsheetId){
    spreadsheetId = spreadsheetId;
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  authorize(credentials, callback, data) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, data);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
  listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Database!F1:F2',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log('Name, Major:');
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(`${row[0]}, ${row[4]}`);
        });
      } else {
        console.log('No data found.');
      }
    });
  }

  appendData(auth, data) {
    var sheets = google.sheets({version: 'v4', auth});

    sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A2:A2',
      valueInputOption: "USER_ENTERED",
      resource: {
        values: data
      }
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      } else {
        event.logme(' ヽ(´▽｀)ノ Data added to GoogleSheet '+spreadsheetId+'\n\n'+data);
      }
    });
  }

  append(data){
    // Load client secrets from a local file.
    fs.readFile(CREDENTIALS, (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      this.authorize(JSON.parse(content), this.appendData, data);
    });
  }
}

module.exports = googleSheetAPI;
