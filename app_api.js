'use strict';

const request = require('request');
const Company = require('./model/company');

let options = {
  url: 'https://haveibeenpwned.com/api/v2/breaches',
  headers: {
    'User-Agent': 'Attemping my first data visualization app'
  }
};

module.exports = function() {
  console.log('Pinging... API');
  request(options, (err, response, body) => {
    if (err || response.statusCode !== 200) console.log(err);
    let data = JSON.parse(body);

    let modelData = data.map(c => {
      return {Title: c.Title, Name: c.Name, Domain: c.Domain, BreachDate: c.BreachDate, Desciption: c.Desciption, AddedDate: c.AddedDate, PwnCount: c.PwnCount, DataClasses: c.DataClasses};
    });
    Company.create(modelData.data, (err, companies) => {
      if (err) console.log('error', err);
      return companies;
    });
  });
};