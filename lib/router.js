
FlowRouter.route('/', {
    name: "start",
    action: ()=> {
        //FlowTransition.flow({top: "header"}, {main: "login"});
        BlazeLayout.render('Layout', {top: "header", main: "login"});
    },
    triggersEnter: [function(context, redirect) {
      console.log(Meteor.user());
      console.log(this.userId);
      user = Meteor.user()
      if(user){
        console.log("Already logged in")
        redirect('/home');
      }else{
        console.log("Not logged in")
      }
    }]
});

FlowRouter.route('/login', {
    name: "login",
    action: ()=> {
        //FlowTransition.flow({top: "header"}, {main: "secure_login"});
        BlazeLayout.render('Layout', {top: "header", main: "secure_login3"});
    },
    triggersEnter: [function(context, redirect) {
      console.log(Meteor.user());
      console.log(this.userId);
      user = Meteor.user()
      if(user){
        console.log("Already logged in")
        redirect('/home');
      }else{
        console.log("Not logged in")
      }
    }]
});

FlowRouter.route('/home', {
    name: "home",
    action: ()=> {
        //FlowTransition.flow({top: "header"}, {main: "secure_login"});
        BlazeLayout.render('Layout', {top: "header", main: "home"});
    },
    /*
    triggersEnter: [function(context, redirect) {
      console.log(Meteor.user());
      console.log(this.userId);
      user = Meteor.user()
      if(user){
        console.log("Already logged in")
      }else{
        console.log("Not logged in")
        redirect('/login');
      }
    }]*/
});

Accounts.onLogin(function() {
  var path = FlowRouter.current().path;
  // we only do it if the user is in the login page
  if(path === "/login"){
    FlowRouter.go("/");
  }
});

FlowRouter.route('/sms/inbox', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "inbox"});
    }
});

FlowRouter.route('/register', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "registration"});
    }
});

FlowRouter.route('/register2', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "insertUserForm"});
    }
});

FlowRouter.route('/merchants/register', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "merchants_register"});
    }
});
FlowRouter.route('/merchants/add_customer', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "add_customer"});
    }
});

FlowRouter.route('/merchants/tfriends',{
  action: ()=> {
      BlazeLayout.render('Layout', {top: "header", main: "transaction_friends"});
  }
})

FlowRouter.route('/merchants/requestPayment/:customer', {
    action: (params)=> {
        BlazeLayout.render('Layout', {top: "header", main: "requestPayment"});
    }
});

FlowRouter.route('/merchants/waitingForPayment/:customer', {
    action: (params)=> {
        BlazeLayout.render('Layout', {top: "header", main: "waitingForPayment"});
    }
});

FlowRouter.route('/merchants/friends', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "merchant_friends"});
    }
});

FlowRouter.route('/merchants/register/verification', {
    action: (params, queryParams)=> {
        BlazeLayout.render('Layout', {top: "header", main: "merchant_sms_verification"});
    }
});

FlowRouter.route('/customers/register', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "customer_register"});
    }
});

FlowRouter.route('/customers/register/verification', {
    action: (params, queryParams)=> {
        BlazeLayout.render('Layout', {top: "header", main: "customer_sms_verification"});
    }
});

FlowRouter.route('/customers/all', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "listAllCustomers"});
    }
});

FlowRouter.route('/transactions/insert', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "insertTransactionForm"});
    }
});

FlowRouter.route('/transactions', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "transaction_home"});
    }
});

FlowRouter.route('/transactions/history', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "history"});
    }
});

FlowRouter.route('/users', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "users"});
    }
});

FlowRouter.route('/merchants', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "meteor_users"});
    }
});

FlowRouter.route('/merchants/add', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "add_founds"});
    }
});
FlowRouter.route('/merchants/transfer/:friend', {
    action:(params, queryParams)=> {
        BlazeLayout.render('Layout', {top: "header", main: "transfer_founds"});
    }
});

FlowRouter.route('/profile', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "merchant_profile"});
    }
});

FlowRouter.route('/payment/recive', {
    action: ()=>{
        BlazeLayout.render("Layout", {top: "header",  main: "recivePayment"});
    }
});

FlowRouter.route('/payment/success/:customer', {
    action: (params, queryParams)=>{
        BlazeLayout.render("Layout", {top: "header",  main: "success"});
    },
    triggersEnter: [function(context, redirect) {
        setTimeout(()=>{FlowRouter.go('/transactions')}, 3000);
    }]
});

FlowRouter.route('/payment/failure/:customer', {
    action: (params, queryParams)=>{
        BlazeLayout.render("Layout", {top: "header",  main: "failure"});
    },
    triggersEnter: [function(context, redirect) {
        setTimeout(()=>{FlowRouter.go('/transactions')}, 3000);
    }]
});

FlowRouter.route('/sms/send', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "sendSMS"});
    }
});
