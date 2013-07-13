
Template.search.queryResults = function  () {
	return Session.get('queryResults')
}

Template.search.isSearching = function  () {
	return Session.get("querySearching");
}
Template.search.isDataLoaded = function  () {
	return Session.get("queryDataLoaded");
}
Template.search.queryResultsCollections = function  () {
	return Session.get('queryResultsCollections')
}

Template.search.isSearchingCollections = function  () {
	return Session.get("querySearchingCollections");
}
Template.search.isDataLoadedCollections = function  () {
	return Session.get("queryDataLoadedCollections");
}

Template.search.isCollections = function  () {
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

Template.search.getCollections = function  () {
	if(!Template.search.isCollections())
	{
		return ['provincias'];
	}
	return Session.get("collections");
}

Template.search.events({
	"keyup #input":function  () {
		value = $("#input").val();
		value = value.split(" ");
		queryKeyword = value[0];
		str = "";
		Session.set("queryKeyword",queryKeyword);
		for (var i = 1; i < value.length; i++) {
			str += value[i]+" ";
		};
		str= str.substring(0,str.length-1);
		if(str){
			collections = Template.search.getCollections();
			queryCollections  = str;
			Session.set("currentCollection",collections[0]);
			Session.set("queryCollections",queryCollections);

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