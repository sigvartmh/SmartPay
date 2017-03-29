import { Template } from 'meteor/templating';

Template.users.helpers({
  users() {
    return Users.find({});
  },
});

Template.meteor_users.helpers({
  users() {
    let users =[]
    musers=Meteor.users.find();
    console.log(musers);
    musers.forEach((user)=>{
      console.log(user);
      users.push(user);
    })
    return users;
  },
});
