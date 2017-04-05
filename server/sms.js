import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

console.log(bodyParser);
Picker.middleware(bodyParser.urlencoded({extended: false}));
Picker.route('/sms/recive/', ({}, request, response) => {
    //console.log("test");
    response.statusCode = 200;
    response.end();
    //console.log("recived sms", request);
    //console.log(request.method);
    console.log("Recived SMS: ", request.body);
    //console.log(request.body.Body);
    //console.log(request.body.From);
    //console.log(request.body.To);

    sms = {
      msg: request.body.Body,
      from: request.body.From
    };

    //Used for debugging
    Inbox.insert(sms,(err, res)=>{
      console.log(err);
      if(err){
         console.log(err);
      };
      if(res){
        console.log(res);
      }
    });

    //Reception logic
    const customer_phone = sms.from;
    if(sms.msg.substr(0, "yes".length).toLowerCase() === "yes"){
      updateTransaction(customer_phone, "accepted");
      storeTransaction(customer_phone);
    }else if(sms.msg.substr(0, "no".length).toLowerCase() === "no"){
      updateTransaction(customer_phone, "declined");
      removeTransaction(customer_phone);
    }else if(sms.msg.substr(0, "register".length).toLowerCase() === "register"){
      parseRegistration(sms.from, sms.msg);
    }else{
      unknownCommand();
    }
});

function registerUser(customer_phone, sms){
}

function storeTransaction(customer_phone){
    const phone = customer_phone.replace("+47", "");
    const customer = Customers.findOne({phone: phone});
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("activeTransactionFound to be stored: ", activeTransaction );
    if(activeTransaction){
      TransactionHistory.insert(activeTransaction);
      Transactions.remove({_id: activeTransaction._id});
    }
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("Is Transaction Removed: ", activeTransaction );
}

function removeTransaction(customer_phone){
  const phone = customer_phone.replace("+47", "");
  const customer = Customers.findOne({phone: phone});
  activeTransaction = Transactions.findOne({sender: customer._id});
  if(activeTransaction){
    Transactions.remove({_id: activeTransaction._id});
  }
  activeTransaction = Transactions.findOne({sender: customer._id});
  console.log("Is Transaction Removed: ", activeTransaction );
}


function updateTransaction(customer_phone, status){
    const phone = customer_phone.replace("+47", "");
    const customer = Customers.findOne({phone: phone});
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("activeTransaction: ", activeTransaction );
    if(activeTransaction){
      Transactions.update({_id: activeTransaction._id},
        {$set:
          {status: status}
        });
    }
    //update client
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("activeTransaction: ", activeTransaction );
}
