import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Users = new Mongo.Collection('user_accounts');
Business = new Mongo.Collection('business_accounts');
Transactions = new Mongo.Collection('transactions');
Customers = new Mongo.Collection('customers');


const MobileWalletSchema = new SimpleSchema({
  provider:{
    type: String,
    label: "Provider of mobile wallet"
  },
  amount:{
    type: Number,
    label: "Amount of mobile cash in wallet"
  },
  apikey:{
    type: String,
    label: "Key to mobile wallet of provider"
  }
});

const AccountSchema = new SimpleSchema({
  amount:{
    type: Number,
    label: "Amount of mobile cash"
  },
  verified:{
    type: Boolean,
    label: "Account has attached phone number"
  },
  mobileWallets: {
    type: Array,
    label: "Collection of mobile-wallets connected to account"
  }
});

const UserSchema = new SimpleSchema({
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
  account:{
    type: AccountSchema,
    label: "Connected mobile account",
    optional: true
  }
});



const BusinessSchema = new SimpleSchema([UserSchema],{
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

const TransactionSchema = new SimpleSchema({
  amount:{
    type: Number,
  },
  seller:{
    type: BusinessSchema,
  },
  buyer:{
    type: UserSchema,
  }
});

Business.attachSchema(BusinessSchema);
Users.attachSchema(UserSchema);
Transactions.attachSchema(TransactionSchema);
Customers.attachSchema(UserSchema);
