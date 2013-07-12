
Template.query.queryResults = function  () {
	return Session.get('queryResults')
}

Template.query.isSearching = function  () {
	return Session.get("querySearching");
}
Template.query.isDataLoaded = function  () {
	return Session.get("queryDataLoaded");
}
Template.query.events({
	"keyup #input":function  () {
		value = $("#input").val();
		Session.set("query",value);
	}
});
Deps.autorun(function() {

  sub = Meteor.subscribe("autocompleteKeywords", Session.get("query"));
  if (sub.ready()) {
		data = Keywords.find().fetch();
		Session.set("queryResults",data);
     	Session.set("querySearching", false);
		Session.set("queryDataLoaded",true);

  } else {
		Session.set("queryDataLoaded",false);
     	Session.set("querySearching", true);
  }
});