
FlowRouter.route('/', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "main"});
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
