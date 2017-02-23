Template.recivePayment.events({
    ".container onSMSArrive":(event, instance)=>{
        console.log("testRecive")
    },
    "click":(event, instance) =>{
        console.log("Clicked:",event);
    },
});

Template.recivePayment.onRendered(() =>{
    //console.log(this.$('.container')[0]);
    console.log("Recive payment rendered");
    //this.$(".container")[0].addEventListener('onSMSArrive', (e)=>{
 // console.log("Attatched event listener to ", this.$('.container'));
});
Template.recivePayment.onDestroyed(()=> {
  console.log("Destroyedtest");
  document.removeEventListener('onSMSArrive');
});


Template.recivePayment.onCreated(function recivePaymentOnCreated() {
  console.log("test");
    document.addEventListener('onSMSArrive', (e)=>{
      let sms = e.data;
//      smsList.set(sms.body);
      console.log(sms, "from eventListner"+sms.body);
      if(SMS) SMS.stopWatch(()=>{
        console.log('watching stopped');
      },()=>{
        console.log('failed to stop watching');
    });
  FlowRouter.go('/payment/success/'+sms.address+"?amount="+sms.body);
  });
});

Template.success.onCreated(function successOnCreated(){
    //document.removeEventListener('onSMSArrive');
    console.log("success created and clean up");
});

Template.success.helpers({
    number: function() {
        console.log(FlowRouter.current().params.user);
        return FlowRouter.current().params.user;
    },
    amount: () => {
        console.log(FlowRouter.current().queryParams.amount);
        return FlowRouter.current().queryParams.amount;
    }
});
