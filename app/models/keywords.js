Keywords = new Meteor.Collection("keywords");
Meteor.methods({
	"autocomplete":function  (query) {

		subscription = Meteor.subscribe("autocompleteKeywords",query,function  () {
			subscription.stop();
		});
	}
});

Collections['keywords'] = Keywords;