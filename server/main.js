import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { Random } from 'meteor/random'

const twilio = require('twilio');

const twilio_sid = process.env.TWILIO_SID;
const twilio_auth = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
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
    'user.register'(first_name, last_name, phone_number, password, business_name){
      console.log(last_name)
      let user = {
        "username": phone_number,
        "password": password,
        "profile":{
          "first_name": first_name,
          "last_name": last_name,
          "business_name": business_name,
          "mobile_account": 0,
          "friends": [],
          "CNIC_number": "00-00",
        },
      };
      console.log(user)

      const userAccount = Meteor.users.findOne({username: phone_number})
      if(userAccount){
        throw new Meteor.Error(
        'user.registration.failed.exsists', //error
        'User account already exsists' //reason
        );
      }

      TempUsers.insert(user); //lacks timeout removal
      verifyAccount(phone_number);
    },
    'user.verify'(phone_number, code){
      console.log(phone_number, code);
      check(phone_number, String);
      check(code, Number);
      const userAccount = TempUsers.findOne({username: phone_number});
      console.log(userAccount);
      console.log({
        phone: phone_number,
        code: code
      });
      const verifyCode = Codes.findOne({
        phone: phone_number,
        code: code
      });

      console.log(verifyCode);
      if (!verifyCode) throw new Meteor.Error(
        'sms.code.verification.failed', //error
        'Invalid verification code' //reason
      );
      Accounts.createUser(userAccount);
      TempUsers.remove({ username: phone_number });
      Codes.remove({phone: phone_number});

      //Account.createUser(user);
    }
});

function verifyAccount(phone_number){
  let code = Math.floor(Random.fraction() * 10000) + '';

  Codes.remove({phone: phone_number});
  Codes.insert({phone: phone_number, code: code});
  phone_number = '+47' + phone_number

  msg = code.toString();

  client.messages.create({
      body: msg,
      to: phone_number,
      from: twilio_number
  }, (err, msg) => {
      console.log(err);
      console.log(msg);
      console.log(msg.sid);
  });
}

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
