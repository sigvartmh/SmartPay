import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Users = new Mongo.Collection('user_accounts');
Business = new Mongo.Collection('business_accounts')

const Schemas = {};

Schemas.UserSchema = new SimpleSchema({
  username:{
    type: Number,
    label: "Phone number"
  },
  //Unsure if we want this
  first_name:{
    type: String,
    label: "Given Name"
  },
  last_name:{
    type: String,
    label: "Surname"
  },
});

Users.attachSchema(Schemas.UserSchema);

const BusinessSchema = new SimpleSchema([Schemas.UserSchema],{
  business:{
    type: String,
    label: "Business name"
  },
  address:{
    type: PakistanAddressSchema,
    label: "Pakistan Address",
    optional: true
  }
});
Business.attachSchema(BusinessSchema);

//http://www.bitboost.com/ref/international-address-formats.html#UPU
const PakistanAddressSchema = new SimpleSchema({
  house: {
   type: String,
   max: 100,
   optional: true
  },
  street: {
   type: String,
   max: 100
  },
  sector: {
   type: String,
   max: 100
  },
 city: {
   type: String,
   max: 50
 },
 country: {
   type: String,
   max: 50
 }
});
