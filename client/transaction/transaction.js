Template.requestPayment.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    })
    console.log(customer);
    return customer;
  },
})

Template.requestPayment.events({
  'submit .transaction'(event){
    event.preventDefault();
    const amount = Number(event.target.amount.value);
    console.log(amount);
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    });
    console.log(customer.phone);
    console.log(Meteor.user().username);
    const transaction = {
      reciver: Meteor.user()._id,
      sender: customer._id,
      amount: amount,
      status: "inProgress"
    }
    Meteor.call('transaction.request', transaction, (err, res)=>{
      if(err){
        console.log(err);
      }else{
        console.log(res);
      }
    });
    console.log(transaction);

  }
})
