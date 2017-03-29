Template.register_merchant.events({
  'submit .login'(event){
    event.preventDefault();
    const password = event.target.password.value;
    const phone_number = event.target.phone_number.value;
    const business_name = event.target.business_name.value;
    Meteor.call('user.register',phone_number,password,business_name,(err)=>{
      if(err){
        console.log(err)
        Materialize.toast(err.reason, 4000)
      }else{
        event.target.password.value = '';
        event.target.phone_number.value = '';
        event.target.business_name.value = '';
      }
    });
}
})
