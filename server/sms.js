import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

console.log(bodyParser);
Picker.middleware(bodyParser.urlencoded({extended: false}));

Picker.route('/sms/recive/', ({}, request, response) => {
    console.log("test");
    response.statusCode = 200;
    console.log(request);
    console.log(request.method);
    console.log(request.body);
    console.log(request.body.Body);
    console.log(request.body.From);
    console.log(request.body.To);
    response.end();
});
