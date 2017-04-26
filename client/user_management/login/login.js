
Template.secure_login.helpers({
  login(phone_number) {
    user = Users.find({username: phone_number})
    console.log(user);
    return user;
  },
});

Template.secure_login3.helpers({
  user() {
    user = Meteor.user();
    return user;
  },
});

Template.secure_login3.events({
  'submit .login'(event){
    event.preventDefault();
    const password = event.target.password.value;
    const phone_number = event.target.phone_number.value;
    Meteor.loginWithPassword(phone_number, password, (err)=>{
      if(err){
        console.log(err);
        if(err.error === 403){Materialize.toast("Wrong phone number or password", 4000)};
      }else{
        event.target.password.value = '';
        event.target.phone_number.value = '';
      }
    });
  //Meteor.call('sms.send',phone_number,text);
},
  'click .logout'(event){
    event.preventDefault();
    console.log("clicked logout");
    Meteor.logout((err)=>{
      console.log(err);
    });
  }
})
