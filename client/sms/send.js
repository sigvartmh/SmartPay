import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './send.html';

Template.sendSMS.events({
  'submit .new-sms'(event){
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    const phone_number = '+47' + target.phone_number.value;
    console.log(phone_number);
    console.log(text);
    target.text.value = '';
    target.phone_number.value = '';
    Meteor.call('sms.send',phone_number,text);
  }
})

Template.inbox.helpers({
  getInbox() {
    return Inbox.find({});
  },
});
