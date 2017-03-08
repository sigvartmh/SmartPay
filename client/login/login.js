Template.secure_login.helpers({
  login(phone_number) {
    user = Users.find({username: phone_number})
    console.log(user);
    return user;
  },
});

Template.secure_login.events({
  'submit .login'(event){
    event.preventDefault();
    const target = event.target;
    const password = target.password.value;
    const phone_number = target.phone_number.value;
    Meteor.call('user.login',phone_number,password);
    target.password.value = '';
    target.phone_number.value = '';
  //Meteor.call('sms.send',phone_number,text);
}
})
