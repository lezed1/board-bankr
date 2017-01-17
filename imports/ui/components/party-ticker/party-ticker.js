import { Session } from 'meteor/session';
import { Transactions } from '/imports/api/transactions/transactions.js';
import './party-ticker.html';

Template.party_ticker.helpers({
	timestamp() {
		Session.get("minute_timer");
		return moment(this.timestamp).fromNow();
	},
    transactions() {
    	console.log("Transactions:");
    	console.log(Transactions.find({}, {sort: {timestamp: -1}}).fetch());
        return Transactions.find({}, {sort: {timestamp: -1}});
    },
    transaction_credit() {
    	return this.amount > 0
    }
});

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
