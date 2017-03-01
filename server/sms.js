import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.middleware(bodyParser.json());

Picker.route('/sms/recive/:number', ({ number }, request, response) => {
    console.log("test", number);
    response.statusCode = 200;
    console.log(request);
    console.log(request.method);
    response.end(String(request.body));
});
