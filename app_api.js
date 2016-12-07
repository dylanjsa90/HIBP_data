'use strict';

const request = require('request');
const Company = require('./model/Company');


module.exports = apiData = function() {
  request('https://haveibeenpwned.com/api/v2/breaches', (err, response, body) => {
    if (err || response.statusCode !== 200) console.log(err);
    response.forEach((i) => {
      Company(i).save()
    })
  })
} 