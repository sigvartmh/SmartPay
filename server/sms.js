import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';
import { CustomerSchema } from '../common.js';

console.log(bodyParser);
Picker.middleware(bodyParser.urlencoded({extended: false}));
Picker.route('/sms/recive/', ({}, request, response) => {
    //console.log("test");
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
      updated = updateTransaction(customer_phone, "accepted", response);
      if(updated){
        storeTransaction(customer_phone, response);
      }
    }else if(sms.msg.substr(0, "no".length).toLowerCase() === "no"){
      updated = updateTransaction(customer_phone, "declined", response);
      if(updated){
        removeTransaction(customer_phone,response);
      }
    }else if(sms.msg.substr(0, "register".length).toLowerCase() === "register"){
      parseRegistration(sms.from, sms.msg, response);
    }else{
      unknownCommand(response);
    }
});

function parseRegistration(from, msg, response){

  parse = msg.split(' ')
  const customer_phone = from.replace("+47", "");

  const customer = {
    first_name : msg[1],
    last_name : msg[2],
    CNIC : msg[3],
    phone : customer_phone,
    verified : true,
    mobile_account : 0
  }
  const isValid = Match.test(customer, CustomerSchema);
  if(isValid){
    Customers.Insert(customer)
    response.writeHead(200, {'Content-Type': 'text/xml'});
    msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
    msg += 'Account for phone number: '+customer_phone + '\n'
    msg += 'was successfuly created.'
    msg += '</Message></Response>'
    response.write(msg);
    response.end();
  }else{
    response.writeHead(200, {'Content-Type': 'text/xml'});
    msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
    msg += 'Unkown Command:\nPlease try with yes/no '
    msg += 'or if you are registrating as a new user '
    msg += 'follow the format: register &lt;first name&gt; &lt;last name&gt; &lt;CNIC&gt;'
    msg += '</Message></Response>'
    response.write(msg);
    response.end();
  }
}

function unknownCommand(response){
  response.writeHead(200, {'Content-Type': 'text/xml'});
  msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
  msg += 'Unkown Command:\nPlease try with yes/no '
  msg += 'or if you are registrating as a new user '
  msg += 'follow the format: register &lt;first name&gt; &lt;last name&gt; &lt;CNIC&gt;'
  msg += '</Message></Response>'
  response.write(msg);
  response.end();
}

function registerUser(customer_phone, sms){
}

function storeTransaction(customer_phone, response){
    const phone = customer_phone.replace("+47", "");
    const customer = Customers.findOne({phone: phone});
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("activeTransactionFound to be stored: ", activeTransaction );

    if(activeTransaction
      && customer.mobile_account >= activeTransaction.amount
      && ((customer.mobile_account - activeTransaction.amount) >= 0)
      ){

      Customers.update({ _id: activeTransaction.sender},{
        $set: { mobile_account: customer.mobile_account - activeTransaction.amount}
      });

      Meteor.users.update({_id: activeTransaction.reciver},{
        $inc:{ "profile.mobile_account":  activeTransaction.amount }
      });

      TransactionHistory.insert(activeTransaction);
      Transactions.remove({_id: activeTransaction._id});

      response.statusCode = 204; //No Content
      response.end();

    }
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("Is Transaction Removed: ", activeTransaction );
}

function removeTransaction(customer_phone, response){
  const phone = customer_phone.replace("+47", "");
  const customer = Customers.findOne({phone: phone});
  activeTransaction = Transactions.findOne({sender: customer._id});

  if(activeTransaction){
    Transactions.remove({_id: activeTransaction._id});
    response.statusCode = 204; //No Content
    response.end();
  }

  activeTransaction = Transactions.findOne({sender: customer._id});
  console.log("Is Transaction Removed: ", activeTransaction );
}


function updateTransaction(customer_phone, status, response){
    const phone = customer_phone.replace("+47", "");
    const customer = Customers.findOne({phone: phone});

    activeTransaction = Transactions.findOne({sender: customer._id});

    console.log("activeTransaction: ", activeTransaction );

    if(activeTransaction && (status === "accepted")
    && !(customer.mobile_account >= activeTransaction.amount) ){
      response.writeHead(200, {'Content-Type': 'text/xml'});

      msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
      msg += 'Insufficient funds on your account\n'
      msg += 'Your current balance: '+ customer.mobile_account
      msg += '</Message></Response>'

      response.write(msg);
      response.end();
      Transactions.update({_id: activeTransaction._id},
        {$set:
          {status: "declined"}
        });
      removeTransaction(customer_phone)
      return false
    }else if(activeTransaction){
      Transactions.update({_id: activeTransaction._id},
        {$set:
          {status: status}
        });
      return true
    }else{
      response.writeHead(200, {'Content-Type': 'text/xml'});
      msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
      msg += 'No active sale is found connected to your phone number'
      msg += '</Message></Response>'
      response.write(msg);
      response.end();
      return false
    }
    //update client
    activeTransaction = Transactions.findOne({sender: customer._id});
    console.log("activeTransaction: ", activeTransaction );
}
