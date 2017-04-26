import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';
import SimpleSchema from 'simpl-schema';
//import { CustomerSchema } from '../common.js';

const CustomerSchema = new SimpleSchema({
  first_name:{
      type: String,
      label: "First Name"
  },
  last_name:{
    type: String,
    label: "Last Name"
  },
  phone: {
    type: String,
    label: "Mobile phone number of customer",
    unique: true
  },
  CNIC: {
    type: String,
    label: "CNIC-number for verifying Pakistani citizenship",
    unique: true
  },
  mobile_account: {
    type: Number,
    label: "Mobile account balance"
  },
  verified: {
    type: Boolean,
    label: "Verified account by SMS"
  }
})

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
    }else if(sms.msg.substr(0, "balance".length).toLowerCase() === "balance"){
      checkBalance(sms.from, response);
    }else{
      unknownCommand(response);
    }
});

function checkBalance(from, response){
  const customer_phone = from.replace("+47", "");
  const customer = Customers.findOne({phone: customer_phone})
  if(customer){
    response.writeHead(200, {'Content-Type': 'text/xml'});
    msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
    msg += 'Your account balance is: '+ customer.mobile_account + '\n'
    msg += '</Message></Response>'
    response.write(msg);
    response.end();
  }else{
    response.writeHead(200, {'Content-Type': 'text/xml'});
    msg = '<?xml version="1.0" encoding="UTF-8" ?><Response><Message>'
    msg += 'Account does not exist with phone number:'+ customer_phone + '\n'
    msg += '</Message></Response>'
    response.write(msg);
    response.end();
  }
}

function parseRegistration(from, msg, response){

  parse = msg.split(" ")
  const customer_phone = from.replace("+47", "");

  const customer = {
    first_name : parse[1],
    last_name : parse[2],
    CNIC : parse[3],
    phone : customer_phone,
    verified : true,
    mobile_account : 0
  }
  const isValid = CustomerSchema.namedContext("myContext").validate(customer);
  console.log("is valid:", isValid)
  console.log(customer)
  if(isValid){
    const exsists = Customers.findOne({phone: customer_phone})
    console.log("exsist": exsists);
    if(!exsists){
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
      msg += 'Account already exsists for phone number: '+customer_phone + '\n'
      msg += '</Message></Response>'
      response.write(msg);
      response.end();
    }
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
