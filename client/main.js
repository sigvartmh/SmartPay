import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.events({
    "click [data-action='recive/payment']": (event, instance) =>{
    if(SMS) SMS.startWatch(function(){
        console.log('watching', 'watching started');
      }, function(){
        console.log('failed to start watching');
    });
    },
});
