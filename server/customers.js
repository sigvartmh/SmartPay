import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { check } from 'meteor/check';

const twilio = require('twilio');

const twilio_sid = process.env.TWILIO_SID;
const twilio_auth = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
const client = new twilio.RestClient(twilio_sid, twilio_auth);

Meteor.methods({
  'customer.register'(name, phone_number, cnic_number){
      check(name, String);
      check(phone_number, String)
      check(cnic_number, String)
      let merchant = Meteor.user()
      if(merchant === null){
        throw Meteor.error("merchant.notAuthorized", "You are not logged inn");
      }
      console.log(merchant);
      //if(Meteor.)
      const customer = {
        name: name,
        phone: phone_number,
        CNIC: cnic_number,
        verified: false
      }

      customerID = Customers.insert(customer);
      console.log(customerID);
      verifyAccount(phone_number);
  },
  'customer.verify'(phone_number, code){
    check(phone_number, String);
    check(code, Number);
    const customerAccount = Customers.findOne({phone: phone_number});
    let merchant = Meteor.user()
    friends = merchant.profile.friends;
    console.log(customerAccount);
    console.log({
      phone: phone_number,
      code: code
    });

    const verifyCode = Codes.findOne({
      phone: phone_number,
      code: code
    });

    console.log(verifyCode);
    if (!verifyCode){
      throw new Meteor.Error(
      'sms.code.verification.failed', //error
      'Invalid verification code' //reason
      )
    };
    Customers.update(
      customerAccount._id,
      { $set: { "verified": true} }
    );
    Meteor.users.update(merchant._id, {$push: {"profile.friends": customerAccount._id}})
    Codes.remove({phone: phone_number});
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
