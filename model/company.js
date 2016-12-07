'use strict';

const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  title: {type: String},
  name: {type: String, required: true},
  domain: {type: String},
  breachDate: {type: Date},
  desciption: {type: String},
  addedDate: {type: Date},
  pwnCount: {type: Number},
  infoBreached: {type: [String]},
  breachedAccountRelations: {type: [String]}
});

module.exports = mongoose.model('Company', CompanySchema);