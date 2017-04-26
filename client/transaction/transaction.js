Template.requestPayment.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    })
    console.log(customer);
    return customer;
  },
})

Template.success.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    });
    console.log(customer)
    return customer;
  },
})

Template.history.helpers({
  sales(){
    const merchant = Meteor.user()
    if(merchant !== undefined){
    const history = TransactionHistory.find({$or: [{"reciver": merchant._id}, {"sender": merchant._id}]});
    return history;
    }
  }
})

Template.sale.helpers({
  recipient(){
    let recive = Meteor.users.findOne({"_id": this.reciver })
    console.log("reciver:",recive)
    if(recive){
      console.log(recive.username)
      return recive.username
    }else{
      recive = Customers.findOne({"_id":this.reciver})
      console.log("Helper return reciver", recive)
      if(recive) return recive.phone;
    }
    console.log("helper:", recive)
  },
  sender_phone(){
    let send = Meteor.users.findOne({"_id": this.sender})
    console.log("Sender:", send)
    if(send){
      console.log(send.username)
      return send.username
    }else{
      send = Customers.findOne({"_id": this.sender})
      console.log("Helper return sender", send)
      if(send) return send.phone;
    }
    console.log("helper:", send)
  }
})

Template.failure.helpers({
  customer() {
    const customer = Customers.findOne({
      phone: FlowRouter.current().params.customer
    });
    console.log(customer)
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
    if(transaction.status === "accepted"){
      Transactions.remove({_id: transaction._id});
      FlowRouter.go('/payment/success/'+customer.phone+"?amount="+transaction.amount);
    }else if(transaction.status === "declined"){
      Transactions.remove({_id: transaction._id});
      FlowRouter.go('/payment/failure/'+customer.phone+"?amount="+transaction.amount);
    }
    return transaction;
  }
})

Template.transaction_friends.helpers({
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

Template.transaction_friends.events({
  'click'(event){
    console.log(this);
    FlowRouter.go('/merchants/requestPayment/'+this.phone);
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
        FlowRouter.go('/merchants/waitingForPayment/'+customer.phone)
      }
    });
    console.log(transaction);

  }
})
