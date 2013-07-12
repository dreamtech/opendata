
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
		Session.set("querySearching",true);
		Session.set("queryDataLoaded",null);

		data = Keywords.find({name:{$regex:"/*"+value+"*"}},{limit:10});

		console.log(data.db_objects); 
		Session.set("querySearching",null);
		Session.set("queryDataLoaded",true);
		Session.set("queryResults",data.db_objects)	
	}
});