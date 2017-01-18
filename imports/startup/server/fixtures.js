// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import { Parties } from '/imports/api/parties/parties.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];

    data.forEach(link => Links.insert(link));
  }
  
  // if the Transactions collection is empty
  if (Transactions.find().count() === 0) {
    const data = [
      {
        partyName: 'asdf',
        title: 'Income',
        from: 'lezed1',
        to: '',
        amount: 5,
        timestamp: new Date(),
      },
      {
        partyName: 'asdf',
        title: 'Buy resources',
        from: 'lezed1',
        to: '',
        amount: -4,
        timestamp: moment().subtract(3, 'minutes').toDate(),
      },
    ];

    data.forEach(transactions => Transactions.insert(transactions));
  }
  
  // if the Parties collection is empty
  if (Parties.find().count() === 0) {
    const data = [
      {
        partyName: 'asdf',
        members: ['lezed1'],
        timestamp: new Date(),
      },
    ];

    data.forEach(party => Parties.insert(party));
  }
});
