
FlowRouter.route('/', {
    action: ()=> {
        BlazeLayout.render('Layout', {top: "header", main: "main"});
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
