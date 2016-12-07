'use strict';

const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
  name: {type: String, required: true},
  emailsBreached: {type: Number},
  breachedAccountRelations: {type: [String]}
});

module.exports = mongoose.model('Company', CompanySchema);