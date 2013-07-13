Template.search.queryResults = function  () {
	return Session.get('queryResults')
}

Template.search.isSearching = function  () {
	return Session.get("querySearching");
}
Template.search.isDataLoaded = function  () {
	return Session.get("queryDataLoaded");
}
Template.search.events({
	"keyup #input":function  () {
		value = $("#input").val();

		Session.set("querySearching",true);
		Session.set("queryDataLoaded",null);

		if(!value)
		{
			Session.set("querySearching",false);
			return 
		}
		Meteor.call("autocomplete",value,function  (error,result) {
			data = Keywords.find().fetch()
			
			Session.set("querySearching",null);
			Session.set("queryDataLoaded",true);
			Session.set("queryResults",data);	
			
		});


		// console.log(data.db_objects); 
	}
});