
FlowRouter.route('/', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "login"});
    }
});
FlowRouter.route('/login', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "secure_login"});
    }
});
FlowRouter.route('/login2', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "secure_login2"});
    }
});
FlowRouter.route('/login3', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "secure_login3"});
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

FlowRouter.route('/customers/register', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "insertCustomerForm"});
    }
});

FlowRouter.route('/customers/all', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "listAllCustomers"});
    }
});

FlowRouter.route('/transaction', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "insertTransactionForm"});
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

FlowRouter.route('/payment/success/:user', {
    action: (params, queryParams)=>{
        BlazeLayout.render("Layout", {top: "header",  main: "success"});
    }
});

FlowRouter.route('/sms/send', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "sendSMS"});
    }
});
