'use strict';

const request = require('request');
let e = {};
e.data = [];
e.fetchAPIData = function() {
  request('https://haveibeenpwned.com/api/v2/breaches', (err, response, body) => {
    if (err || response.statusCode !== 200) console.log(err);
    response.forEach((i) => {
      e.data.push(i);      
    });
  });
};

module.exports = exports = e;