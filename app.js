'use strict';

const fs = require('fs');
const request = require('request');

const readStream = fs.createReadStream('data/HIBP_data.txt');
let fileRead;
let obj = {};

readStream.on('readable', () => {
  let chunk;
  while(null !== (chunk = readStream.read())) {
    fileRead = (fileRead === undefined) ? fileRead = chunk : fileRead += chunk;
  }
});

readStream.on('end', () => {
  console.log('Typeof fileRead: ' + typeof fileRead);
  console.log('Read Stream Complete');

  let splitLines = fileRead.split('\r\n');
  parseData(splitLines);
  console.log('Object: ', obj);
});

function parseData(inputLine) {
  inputLine.forEach((e) => {
    let parsed = e.split(' ');
    let num = parseInt(parsed[1]);
    let emails = parsed[0].split(';').slice(1);
    for (var i = 0; i < emails.length; i++) {
      if (!obj.hasOwnProperty(emails[i])) {
        obj[emails[i]] = {};
        obj[emails[i]].count = 0;
        obj[emails[i]].related = [];
      }
      obj[emails[i]].count += num;
      let relatedArray = emails.filter((email) => {
        return email !== emails[i];
      });
      
      obj[emails[i]].related.push(relatedArray.join(' '));
    }
  });
}

