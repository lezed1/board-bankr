// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';
import { Transactions } from '/imports/api/transactions/transactions.js';

Meteor.publish('links.all', function () {
  return Links.find();
});

Meteor.publish('partyInfo', function () {
  return Transactions.find();
});
