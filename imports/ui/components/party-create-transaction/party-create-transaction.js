import { Session } from 'meteor/session';
import { Parties } from '/imports/api/parties/parties.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import './party-create-transaction.html';

function map_members_to_standings(party) {
    const userName = Session.get("userName");

    return party.members.filter((name => name != userName)).map(member => {
        var standing = 0;
        transactions = Transactions.find({partyName: party.partyName, from: member});
        transactions.forEach(transaction => {standing += transaction.amount});
        return {name: member, standing};
    });
}

Template.party_create_transaction.helpers({
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

Template.party_create_transaction.events({
    'submit form': (event, template) => {
        event.preventDefault();

        const userName = Session.get("userName");
        if (!userName) {
            alert("Please set a name before creating a transaction!");
            return;
        }

        const target = event.target;
        const partyName = FlowRouter.getParam("partyName");
        const title = target.title.value;
        const from = userName;
        const to = target.to.value;
        const amount = parseInt(target.amount.value);

        if (isNaN(amount)) {
            alert(`${amount} is not a valid number!`);
            return;
        }


        Meteor.call('transactions.createTransaction', partyName, title, from, to, amount, (error) => {
            if (error) {
                console.log(error);
                alert(error.message);
            } else {
                target.title.value = '';
                // target.to.value = '';
                target.amount.value = '';
            }
        });
    }
})
