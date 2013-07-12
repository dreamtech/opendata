
Template.query.queryResults = function  () {
	return Session.get('queryResults')
}

Template.query.isSearching = function  () {
	return Session.get("querySearching");
}
Template.query.isDataLoaded = function  () {
	return Session.get("queryDataLoaded");
}

Template.query.isCollections = function  () {
	if(!Session.get("queryDataLoaded"))
	{
		return false;
	}

	collections = {};
	data = Session.get("queryResults");
	data.forEach(function  (doc) {
		collections[doc.collection] = doc.collection;

	});
	datos=[];
	for(col in collections)
	{
		datos.push(col);
	}
	Session.set('queryCollections',datos);
	// return collections;
	return true;
}

Template.query.getCollections = function  () {
	if(!Template.query.isCollections())
	{
		return [];
	}
	return Session.get("queryCollections");
}

Template.query.events({
	"keyup #input":function  () {
		value = $("#input").val();
		value = value.split(" ");
		queryKeyword = value[0];
		Session.set("queryKeyword",queryKeyword);

		queryCollections  = value[1];
		if(queryCollections){
			Session.set("queryCollections",queryCollections)
		}
	}
});
Deps.autorun(function() {
  
  sub = Meteor.subscribe("autocompleteKeywords", Session.get("queryKeyword"));
  if (sub.ready()) {
		data = Keywords.find().fetch();
		console.log(data);
		collections = [];
		data.forEach(function  (doc) {
		});

		Session.set("queryResults",data);
     	Session.set("querySearching", false);
		Session.set("queryDataLoaded",true);

  } else {
		Session.set("queryDataLoaded",false);
     	Session.set("querySearching", true);
  }

});