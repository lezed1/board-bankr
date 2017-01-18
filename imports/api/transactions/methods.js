// Methods related to Parties

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Transactions } from './transactions.js';


Meteor.methods({
  'transactions.createTransaction': function(partyName, title, from, to, amount) {
    check(partyName, String);
    check(title, String);
    check(from, String);
    check(to, String);
    check(amount, Match.Integer);


    Transactions.insert({
        partyName,
        title,
        from,
        to,
        amount,
        timestamp: new Date(),
    });
  },
});
