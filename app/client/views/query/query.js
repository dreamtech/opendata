
Template.query.queryResults = function  () {
	return Session.get('queryResults')
}

Template.query.isSearching = function  () {
	return Session.get("querySearching");
}
Template.query.isDataLoaded = function  () {
	return Session.get("queryDataLoaded");
}
Template.query.queryResultsCollections = function  () {
	return Session.get('queryResultsCollections')
}

Template.query.isSearchingCollections = function  () {
	return Session.get("querySearchingCollections");
}
Template.query.isDataLoadedCollections = function  () {
	return Session.get("queryDataLoadedCollections");
}

Template.query.isCollections = function  () {
	if(!Session.get("queryDataLoaded"))
	{
		return false;
	}

	collections = {};
	data = Session.get("queryResults");
	data.forEach(function  (doc) {
		collections[doc.collections] = doc.collections;

	});
	datos=[];
	for(col in collections)
	{
		datos.push(col);
	}
	Session.set('collections',datos);
	// return collections;
	return true; 
}

Template.query.getCollections = function  () {
	if(!Template.query.isCollections())
	{
		return ['provincias'];
	}
	return Session.get("collections");
}

Template.query.events({
	"keyup #input":function  () {
		value = $("#input").val();
		value = value.split(" ");
		queryKeyword = value[0];

		Session.set("queryKeyword",queryKeyword);
		if(value[1]){
			collections = Template.query.getCollections();
			queryCollections  = value[1];
			Session.set("currentCollection",collections[0]);
			Session.set("queryCollections",queryCollections);
			// if(queryCollections){
			// 	Session.set("queryCollections",queryCollections)
			// }

		}

		
	}
});
Deps.autorun(function() {
  try{
	  sub = Meteor.subscribe("autocompleteKeywords", Session.get("queryKeyword"));
	  if (sub.ready()) {
			data = Keywords.find().fetch();
			Session.set("queryResults",data);
	     	Session.set("querySearching", false);
			Session.set("queryDataLoaded",true);

	  } else {
			Session.set("queryDataLoaded",false);
	     	Session.set("querySearching", true);
	  }

	  sub2 = Meteor.subscribe("autocompleteCollections",Session.get("currentCollection"), Session.get("queryCollections"));
	    if (sub2.ready()) {
	    	collection = Session.get("currentCollection");

			data = Collections[collection].find().fetch();

			Session.set("queryResultsCollections",data);
	     	Session.set("querySearchingCollections", false);
			Session.set("queryDataLoadedCollections",true);

	  } else {
			Session.set("querySearchingCollections",false);
	     	Session.set("querySearchingCollections", true);
	  }
	}catch(ex){
		console.log("Explotion!!");
	}

});