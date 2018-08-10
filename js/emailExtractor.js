"use strict";

var fs = require('fs');
const event = require("../tools/event");

class emailExtractor {
  constructor(){
    this.contents = '';
    this.emails = [];
  }

  getEmails(){
    return this.emails;
  }

  extract(content){
    if (content){
       var re = /\([mailto]{1}(@*.*?)\)/g;

       event.logfn(this.extract.name);

       var m;
       do {
           m = re.exec(content);
           if (m) {
             var filtered = this.split(m[1]);
             if (!filtered)
              continue;
             var row = [];
             row.push(filtered);
             this.emails.push(row);
           }
       } while (m);
     }
  }

  read(file, api){
    fs.readFile(file, 'utf8',(err, content) => {
      if (err) return;
      this.extract(content);

      if(this.emails)
        api.append(this.emails);
    });
  }

  split(content){
    content = content.split(':')[1];
    return content;
  }
}

module.exports = emailExtractor;
