Template.requestPayment.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    })
    console.log(customer);
    return customer;
  },
})
Template.waitingForPayment.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    })
    console.log(customer);
    return customer;
  },
  transaction(){
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    })
    console.log("transaction: ", customer)
    const transaction = Transactions.findOne({
      sender: customer._id
    })
    console.log(transaction)
    //Probably make a struct of status
    /*
    if(transaction.status === "accepted"){
      FlowRouter.goFlowRouter.go('/payment/success/'+customer.phone+"?amount="+transaction.amount);
    }else if(transaction.status === "declined"){
      console.log("Declined")
    }//else{ return}*/
    return transaction;
  }
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
