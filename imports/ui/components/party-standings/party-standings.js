import { Session } from 'meteor/session';
import { Parties } from '/imports/api/parties/parties.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import './party-standings.html';

function map_members_to_standings(party) {
    return party.members.map(member => {
        var standing = 0;

        // Sum transactions form the member and (the negation of) to the member
        transactions = Transactions.find({partyName: party.partyName, from: member});
        transactions.forEach(transaction => {standing += transaction.amount});

        transactions = Transactions.find({partyName: party.partyName, to: member});
        transactions.forEach(transaction => {standing -= transaction.amount});
        
        return {name: member, standing};
    });
}

Template.party_standings.helpers({
    members() {
        const partyName = FlowRouter.getParam("partyName");
        const party = Parties.findOne({partyName: partyName}, {sort: {name: -1}});
        if (party) {
            return map_members_to_standings(party);
        } else {
            return [];
        }
    }
});
