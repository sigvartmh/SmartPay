import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';

Template.merchant_profile.helpers({
  profile() {
    return Meteor.user();
  },
});

Template.merchant_profile.events({
  'click .add_friend'(event){
    event.preventDefault();
    FlowRouter.go('/customers/register');
  }

})
