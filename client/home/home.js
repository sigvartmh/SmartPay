Template.home.helpers({
  user() {
    user = Meteor.user();
    return user;
  },
});

Template.home.events({
  'click .logout'(event){
  event.preventDefault();
  console.log("clicked logout");
  Meteor.logout((err)=>{
    console.log(err);
    FlowRouter.go('/')
  });
}})
