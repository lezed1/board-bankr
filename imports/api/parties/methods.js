// Methods related to Parties

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Parties } from './parties.js';

Meteor.methods({
  'parties.updateUserName': function(partyName, oldUserName, newUserName) {
    check(partyName, String);
    check(oldUserName, String);
    check(newUserName, String);

    if (Parties.findOne({partyName})) {
        Parties.update({partyName}, {$pull: {members: oldUserName}});
    } else {
        Parties.insert({partyName, members: [], timestamp: new Date()});
    }

    if (newUserName) {
        Parties.update({partyName}, {$addToSet: {members: newUserName}});
    }
  },
});
