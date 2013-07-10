Template.query.queryResults = function  () {
	return Session.get('queryResults')
}



Template.query.events({
	"keyup #input":function  () {
		Session.set("queryResults","Jacobo")	}
});