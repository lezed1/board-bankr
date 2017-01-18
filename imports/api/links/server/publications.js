// All publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import { Parties } from '/imports/api/parties/parties.js';

Meteor.publish('links.all', function () {
  return Links.find();
});

Meteor.publish('partyInfo', function (partyName) {
  return [Parties.find({partyName: partyName}), Transactions.find({partyName: partyName})];
});
