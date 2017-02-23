import { Template } from 'meteor/templating';

Template.users.helpers({
  users() {
    return Users.find({});
  },
});
