Template.listAllCustomers.helpers({
  customers() {
    return Customers.find({});
  },
});


Template.customer_register.helpers({
  user() {
    const user = Meteor.user();
    return user;
  },
});

Template.add_customer.events({
  'submit .add'(event){
    event.preventDefault();
    const phone_number = event.target.phone_number.value;
    const customer = Customers.findOne({"phone":phone_number})
    const merchant = Meteor.user()
    if(customer){
      if(customer.verified){
        Meteor.users.update(merchant._id, {$push: {"profile.friends": customer._id}})
        FlowRouter.go('/merchants/friends')
      }else{
        Materialize.toast("Customer not verified", 4000)
      }
      console.log("add and go back")
    }else{
      Materialize.toast("Customer not registred, redirecting", 3000)
      setTimeout(()=>FlowRouter.go('/customers/register'),3000);
      console.log("redirect to customer registration")
    }
    console.log(customer)
    console.log(phone_number)
  }
})

Template.customer_register.events({
  'submit .register'(event){
    event.preventDefault();
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const phone_number = event.target.phone_number.value;
    const CNIC_number = event.target.cnic_number.value;

    Meteor.call('customer.register', first_name, last_name, phone_number, CNIC_number, (err, res) =>{
      if(err){
        console.log(err)
        Materialize.toast(err.reason, 4000)
      }else{
        console.log(res)
        event.target.first_name.value = ''
        event.target.last_name.value = ''
        event.target.phone_number.value = ''
        event.target.cnic_number.value = ''
        FlowRouter.go('/customers/register/verification'+"?phone="+phone_number);
      }
    });
  }
});

Template.customer_sms_verification.events({
  'submit .verify'(event){
    event.preventDefault();
    const phone_number = String(FlowRouter.current().queryParams.phone);
    const code = Number(event.target.sms_code.value);
    console.log(event);
    console.log(phone_number, code);
    //console.log(Codes.findOne({phone:phone_number}));
    //console.log(TempUsers.findOne({username:phone_number}));
    Meteor.call('customer.verify', phone_number, code ,(err) => {
      if(err){
        console.log(err)
        Materialize.toast(err.reason, 4000)
      }else{
        event.target.sms_code.value = '';
        FlowRouter.go('/registration/success/'+phone_number);
      }
    });
  }
})
