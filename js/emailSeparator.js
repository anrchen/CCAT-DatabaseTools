"use strict";

var fs = require('fs');
var path = require('path');
const event = require("../tools/event");

class emailSeparator {
  constructor(){
    this.emails = [];
  }

  separate(content){
    var re = /\<([^>]+)\>/g;

    event.logfn(this.separate.name);

    var m;
    do {
        m = re.exec(content);
        if (m) {
            // emails.push(m[1]);
            var row = [];
            row.push(m[1]);
            this.emails.push(row);
        }
    } while (m);
  }

  read(file, api){
    fs.readFile(file, 'utf8',(err, content) => {
      if (err) return;
      this.separate(content);

      if(this.emails)
        api.append(this.emails);
    });
  }
}

module.exports = emailSeparator;
