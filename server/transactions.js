import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { check } from 'meteor/check';

const twilio = require('twilio');

const twilio_sid = process.env.TWILIO_SID;
const twilio_auth = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
const client = new twilio.RestClient(twilio_sid, twilio_auth);

Meteor.methods({
  'transaction.request'(transaction){
    check(transaction.reciver, String)
    check(transaction.sender, String)
    check(transaction.amount, Number)
    check(transaction.status, String)
    customer = Customers.findOne({_id: transaction.sender});
    merchant = Meteor.user();
    console.log("server: ", customer);
    console.log("server: ", merchant)
    verifyTransaction(customer.phone, merchant.profile.name, transaction);
  }
})
function verifyTransaction(phone_number, business_name, transaction){

  const phone = '+47' + phone_number;
  let msg = business_name + " has requested "+ transaction.amount + "₹ from you.\n";
  msg += "Answer yes/no to approve or decline this request";
  client.messages.create({
      body: msg,
      to: phone,
      from: twilio_number
  }, Meteor.bindEnvironment((err, msg) => {
      if(err){
        console.log(err);
      }else{
        console.log("twillio msg: ", msg);
        transaction['sid'] = msg.sid;
        transaction['date'] = new Date();
        Transactions.insert(transaction);
      }
      console.log(msg.sid);
  }));
}
