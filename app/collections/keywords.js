Keywords = new Meteor.Collection("keywords");

Meteor.methods({
	"autocomplete":function  (query) {
		// console.log(query)
		subscription = Meteor.subscribe("autocompleteKeywords",query,function  () {
			Keywords.find().fetch()
			subscription.stop();
		});
		// Keywords.find();
	}
});