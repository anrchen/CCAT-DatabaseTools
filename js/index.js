/*
 * Google API set-up
 */
const googleSheetAPI = require('../api/googleSheet/googleSheetAPI.js');
const api = new googleSheetAPI('1oReZKr5MIu1qsFI_1fLe0AWy9rDhpAocipErvSYmGlc');

/*
 * Feature 1: Parse emails from email list provided by tool such as Outlook
 */
parseEmailList = (words) => {
  const emailSeparator = require('./emailSeparator.js');
  const separator = new emailSeparator();
  var emails = separator.read('./data/emails.md', api);
}


/*
 * Feature 2: Parse emails from booklets in .md format using regex
 */
parseEmailFromMd = () =>{
  const emailExtractor = require('./emailExtractor.js');
  const extractor = new emailExtractor();
  extractor.read('./data/page-17.md', api);
}

module.exports = {
  parseEmailList,
  parseEmailFromMd,
}
