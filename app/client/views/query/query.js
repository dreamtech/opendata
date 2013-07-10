Template.query.queryResults = function  () {
	return Session.get('queryResults')
}

Template.query.events({
	"keyup #input":function  () {
		value = $("#input").val();
		data = Keywords.find({name:{$regex:"/*"+value+"*"}});
		Session.set("queryResults",data.db_objects)	
	}
});