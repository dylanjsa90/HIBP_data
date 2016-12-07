'use strict';

const fs = require('fs');
const app = require('express')();
const mongoose = require('mongoose');
const Company = require('./model/company'); 
const apiData = require('./app_api');
const Promise = require('./lib/promise');
let readStream;

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
// const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.Promise = Promise;
mongoose.connect(LOCAL_DB_SERVER);
let pulledApiData = [];

function isPopulated() {
  Company.find({}).then(companies => {
    console.log('Companies ',  companies);
    if(!companies) {
      let data = apiData.fetchAPIDataAndPopulateDB();
      pulledApiData = apiData.data;
    } else {
      pulledApiData = companies;
    }
  }, err => console.log(err));
  // startReadStream();
}

let fileRead;
let obj = {};
function startReadStream() {
  readStream = fs.createReadStream('data/HIBP_data.txt');
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
}

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
isPopulated();

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
});

app.listen(3000, () => console.log('Server up'));

