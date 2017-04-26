

Template.merchants_register.events({
  'submit .register'(event){
    event.preventDefault();
    const password = event.target.password.value;
    const password_again = event.target.password_again.value;

    if(password_again !== password){
      throw Meteor.Error("register_merchant.password.nomatch", "The passwords does not match");
    }

    const phone_number = event.target.phone_number.value;
    const business_name = event.target.business_name.value;
    console.log("business:", business_name)
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;

    Meteor.call('user.register',first_name, last_name, phone_number, password, business_name,(err)=>{
      if(err){
        console.log(err)
        Materialize.toast(err.reason, 4000)
      }else{
        event.target.first_name = '';
        event.target.last_name = '';
        event.target.password.value = '';
        event.target.password_again.value = '';
        event.target.phone_number.value = '';
        event.target.business_name.value = '';
        FlowRouter.go('/merchants/register/verification'+"?phone="+phone_number);
      }
    });
}
})

Template.merchant_sms_verification.events({
  'submit .verify'(event){
    event.preventDefault();
    const phone_number = String(FlowRouter.current().queryParams.phone);
    const code = Number(event.target.sms_code.value);
    console.log(event);
    console.log(phone_number, code);
    //console.log(Codes.findOne({phone:phone_number}));
    //console.log(TempUsers.findOne({username:phone_number}));
    Meteor.call('user.verify', phone_number, code ,(err) => {
      if(err){
        console.log(err)
        Materialize.toast(err.reason, 4000)
      }else{
        event.target.sms_code.value = '';
        FlowRouter.go('/login'); // Go to success
      }
    });
  }
})

Template.merchant_friends.helpers({
  friends(){
    user = Meteor.user();
    if(user){
      console.log(user);
      return Customers.find({_id:{$in: user.profile.friends}});
    }else{
      return [];//)
    }
  }
})

Template.merchant_friends.events({
  'click #remove'(event){
    console.log("remove clicked");
    const merchant = Meteor.user();
    const customer = this;
    Meteor.users.update(merchant._id, {$pop: {"profile.friends": customer._id}})
  },
  'click #friend'(event){
    const customer = this;
    console.log(this);
    console.log("friend clicked");
    FlowRouter.go('/merchants/transfer/'+this.phone)
  }
})
