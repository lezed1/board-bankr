import { Parties } from '/imports/api/parties/parties.js';
import './party-welcome.html';

Template.party_welcome.onRendered(function () {
    this.$('#userName').val(Session.get('userName'));
});

Template.party_welcome.helpers({
    partyName() {
        return FlowRouter.getParam("partyName");
    },
    timestamp() {
        const partyName = FlowRouter.getParam("partyName");
        const party = Parties.findOne({partyName: partyName}, {sort: {name: -1}});
        if (party){
            return moment(party.timestamp).fromNow();
        } else {
            return "";
        }
    }
});

Template.party_welcome.events({
    'input #userName': function (event, template) {
        const partyName = FlowRouter.getParam("partyName");
        const oldUserName = Session.get('userName');
        const newUserName = event.target.value;

        Session.update('userName', newUserName);
        Meteor.call('parties.updateUserName', partyName, oldUserName, newUserName, (error) => {
            if (error) {
                console.log(error);
                alert(error.message);
            }
        });
    }
})
