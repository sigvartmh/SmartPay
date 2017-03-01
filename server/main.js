import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
const twilio = require('twilio') ;

const twilio_sid = 'fillout';
const twilio_auth = 'fillout';
const twilio_number = "fillout";
process.env.TWILIO_ACCOUNT_SID=twilio_sid;
process.env.TWILIO_AUTH_TOKEN=twilio_auth;
console.log(twilio_sid);
console.log(twilio_auth);
let client = new twilio.RestClient(twilio_sid, twilio_auth);


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
});
