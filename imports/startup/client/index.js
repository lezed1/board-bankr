// Import client startup through a single index entry point

import { Session } from 'meteor/session';

import './routes.js';

Meteor.setInterval(function() {
    Session.set("minute_timer", new Date().getTime());
}, 60000);
