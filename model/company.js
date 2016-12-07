'use strict';

const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  Title: {type: String},
  Name: {type: String, required: true},
  Domain: {type: String},
  BreachDate: {type: Date},
  Desciption: {type: String},
  AddedDate: {type: Date},
  PwnCount: {type: Number},
  DataClasses: {type: [String]},
  BreachedAccountRelations: {type: [String]}
});

module.exports = mongoose.model('Company', CompanySchema);