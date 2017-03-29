import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Users = new Mongo.Collection('user_accounts');
Business = new Mongo.Collection('business_accounts');
Transactions = new Mongo.Collection('transactions');
Customers = new Mongo.Collection('customers');
Inbox = new Mongo.Collection('recived_sms')
Codes = new Mongo.Collection('verification_codes');
TempUsers = new Mongo.Collection('temporary_userschema');

const ProfileSchema = new SimpleSchema({
  name:{
      type: String,
      label: "Business Name"
  },
  mobile_account: {
    type: Number,
    label: "Mobile account value"
  },
  friends:{
    type: Array,
    label: "Friends connected to merchants"
  },
  CNIC_number: {
    type: String,
    label: "CNIC-number for verifying Pakistani citizenship"
  }
})

const TempUserSchema = new SimpleSchema({
  username: {
    type: String,
    unique: true,
    label: "Phone number of user",
    regEx: /^[0-9\-\+]{8,15}$/
  },
  password: {
    type: String,
    label: "Password of user"
  },
  profile: {
    type: ProfileSchema,
    label: "Schema containing additional information"
  }
})

const SMSVerificationSchema = new SimpleSchema({
  code:{
    type: Number,
    label: "Generated Verification number"
  },
  phone:{
    type: String,
    unique: true,
    label: "Phone number for verification SMS",
    regEx: /^[0-9\-\+]{8,15}$/
  }
})


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
    label: "Phone number",
    unique: true
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
  password:{
    type: String,
    label: "Password"
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

const SMSSchema = new SimpleSchema({
  from:{
    type: String
  },
  msg:{
    type: String
  }
});

Business.attachSchema(BusinessSchema);
Users.attachSchema(UserSchema);
//Transactions.attachSchema(TransactionSchema);
Inbox.attachSchema(SMSSchema);
TempUsers.attachSchema(TempUserSchema);
Codes.attachSchema(SMSVerificationSchema);

AccountsTemplates.configure({
  forbidClientAccountCreation:false,
});
