import { Session } from 'meteor/session';
import { Transactions } from '/imports/api/transactions/transactions.js';
import './party-ticker.html';

Template.party_ticker.helpers({
    transactions() {
        return Transactions.find({partyName: FlowRouter.getParam("partyName")}, {sort: {timestamp: -1}});
    },
    transaction_credit() {
    	return this.amount > 0
    }
});

Template.transaction.helpers({
    timestamp() {
        Session.get("minute_timer");
        const timestamp = moment(this.transaction.timestamp);
        return `${timestamp.fromNow()} (${timestamp.calendar()})`;
    },
});