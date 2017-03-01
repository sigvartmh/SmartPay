import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './send.html';

Template.sendSMS.events({
  'submit .new-sms'(event){
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    console.log(text);
    target.text.value = '';
    Meteor.call('sms.send','+4792683864',text);
  }
})
