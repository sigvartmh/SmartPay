Template.add_funds.events({
  'submit .founds'(event){
    event.preventDefault();
    const amount = Number(event.target.amount.value)
    const phone_number = event.target.phone_number.value;
    const user = Meteor.users.findOne({username: phone_number});
    console.log("user:",user);
    console.log("submit clicked", amount);
    Meteor.users.update(user._id, {$inc: {"profile.mobile_account": amount}})
  }
})

Template.transfer_funds.helpers({
  customer(){
    const friend =  Customers.findOne({
      phone: FlowRouter.current().params.friend
    });
    console.log(friend);
    return friend
  }
})

Template.transfer_funds.events({
  'submit .transfer'(event){
    event.preventDefault();
    const merchant = Meteor.user()
    const amount = Number(event.target.amount.value)
    const friend =  Customers.findOne({
      phone: FlowRouter.current().params.friend
    });
    if(merchant.profile.mobile_account < amount){
      Materialize.toast("Insufficient founds", 3000);
    }else{
      console.log(friend);
      Meteor.users.update(merchant._id, {$set: {"profile.mobile_account": (merchant.profile.mobile_account-amount)}})
      Customers.update(friend._id, {$inc: {"mobile_account": amount}})
      let transaction = { sender: merchant._id, reciver: friend._id, amount: amount, status: "complete"}
      transaction['date'] = new Date();
      TransactionHistory.insert(transaction);
    }
  }
})
