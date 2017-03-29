import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { AccountsServer } from 'meteor/accounts-base'

const twilio = require('twilio') ;

const twilio_sid = process.env.TWILIO_SID;
const twilio_auth = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
console.log(twilio_sid);
console.log(twilio_auth)
const client = new twilio.RestClient(twilio_sid, twilio_auth);

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'sms.send'(customer_number, data){
        console.log("Send method called");
        check(customer_number, String);
        check(data, String);

        console.log("CN: ", customer_number, "MSG: ", data);
        console.log("SID: ", customer_number, "MSG: ", data);

        client.messages.create({
            body: data,
            to: customer_number,
            from: twilio_number
        }, (err, msg) => {
            console.log(err);
            console.log(msg);
            console.log(msg.sid);
        });
    },
    'user.login'(phone_number,password){
      check(phone_number, String);
      check(password, String);
      console.log(phone_number);
      console.log(password);
      const user = Users.find({username:phone_number});
      const test = user.fetch();
      console.log(user);
      console.log(test);
    },
    'user.register'(phone_number, password, business_name){
      let options = {
        "username": phone_number,
        "password": password,
        "profile":{
          "name": business_name,
          "mobile_account": 0,
          "friends": [],
          "CNIC_number": "00-00",
        },
      };
      console.log(options);
      Accounts.createUser(options);
    },
});

/*
Accounts.onCreateUser((options,user)=>{
    user.profile['account'] = 0;
    user.profile['friends'] = [];
    console.log(user);
    return user;
});*/

/* add phone validation
AccountsServer.validateNewUsers((user)=>{

});*/
