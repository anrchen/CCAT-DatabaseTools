var argv = require('yargs').argv;

// Welcome message
const event = require('./tools/event');
event.logwelcome();

// 'yargsInteractive' module for user inputs
const interactive = require('./tools/interactive');
const yargsInteractive = require('yargs-interactive');

yargsInteractive()
  .usage('$0 <command> [args]')
  .interactive(interactive.options)
  .then((result) => {

    // Require feature modules
    const modules = require('./js/index.js');
    if(result.whichFeature == 1){
      event.logme('ヾ(-_- )ゞ You picked <parse emails list into Google Sheet>'
      +'\nMake sure to place your email list in <data/emails.md> file');
      modules.parseEmailList()
      return;
    }
    event.logme('ヾ(-_- )ゞ You picked <parse emails from markdown files into Google Sheet>'
    +'\nMake sure to place all .md files in <data> folder');
    modules.parseEmailFromMd();
  });

/*
 * Feature call
 */
// const modules = require('./js/index.js');
// modules.parseEmailList();
// modules.parseEmailFromMd();
