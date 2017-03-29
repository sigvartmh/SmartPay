Template.registration.events({
  'submit .registration'(event){
    event.preventDefault();
    const target = event.target;
    const elm = event.target.elements;
    console.log(elm);
    let user = {};
    for(let i=0; i<elm.length-1; i++){
      user[elm.item(i).id]= elm.item(i).value;
    }
    console.log(user);
    //console.log(target.elements.namedItem("phone_number").value);
    //console.log(target);
    Users.insert(user,(err, res)=>{
      console.log(err);
      if(err){
         Materialize.toast(err, 4000)
      };
      console.log(res);
      if(res){
        Materialize.updateTextFields();
        Materialize.toast(res, 4000);
      }
    });
    for(let i=0; i<event.target.elements.length-1; i++){
      event.target.elements.item(i).value = '';
    }

  }
});
