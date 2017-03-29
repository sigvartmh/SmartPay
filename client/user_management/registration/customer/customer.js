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

Template.customer_register.events({
  'submit .register'(event){
    event.preventDefault();
    const name = event.target.customer_name.value;
    const phone_number = event.target.phone_number.value;
    const CNIC_number = event.target.cnic_number.value;

    Meteor.call('customer.register', name, phone_number, CNIC_number, (err, res) =>{
      if(err){
        console.log(err)
      }else{
        console.log(res)
        event.target.customer_name.value = ''
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
        FlowRouter.go('/login3');
      }
    });
  }
})
