Template.listAllCustomers.helpers({
  customers() {
    return Customers.find({});
  },
});
