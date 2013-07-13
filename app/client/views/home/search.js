
function ucfirst (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ucfirst('kevin van zonneveld');
  // *     returns 1: 'Kevin van zonneveld'
  str += '';
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
}

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
activeClass = {'background-color':'#0088cc',color:'#ffffff'};
disabledClass = {'background-color':'',color:''};

Template.search.downSelect = function  () {
	first = $(".query-results").children().first();
	selected = $(".query-results [selected=selected]");
	next = $(".query-results [selected=selected]").next();
	if($(next).data('id') == null)
		next = first;
	$(selected).attr("selected",false);
	$(selected).css(disabledClass);

	$(next).attr("selected",true);
	$(next).css(activeClass);
	// Session.set('selectedElement',next);

}

Template.search.keywordVisible = function  (id) {
	if(Session.get("currentKeywords") == id)
		return "hidden";
	else 
		return "";
}
Template.search.upSelect = function  () {

	last = $(".query-results").children().last();
	
	selected = $(".query-results [selected=selected]");
	prev = $(".query-results [selected=selected]").prev();
	
	if($(prev).data('id') == null)
		prev = last;
	$(selected).attr("selected",false);
	$(selected).css(disabledClass);

	$(prev).attr("selected",true);
	$(prev).css(activeClass);
}

Template.search.inputTex = "";

Template.search.events({
	"keyup #input":function  (e) {
	// Session.set('selectedElement',prev);
		value = $("#input").val();
		if(value.length < 5)
		{	Session.set("currentKeywords",null);
			Session.set("currentKeyword",null);
		}
		if(e.keyCode === 40)
		{
			Template.search.downSelect();
			
			return;
		}else if(e.keyCode === 38)
		{
			Template.search.upSelect();
			
			return;
		}else if(e.keyCode === 13)
		{
			selected = $(".query-results [selected=selected]");

			if($(selected).data('id') === null)
			{	
				return;
			}
			text = $(selected).text();
			currentKeywords = Session.get("currentKeywords") != null?Session.get("currentKeywords"):{};
			collection = $(selected).data('collection');
			currentKeywords[collection] = $(selected).data('id');
			Session.set("currentKeywords",currentKeywords);
			
			currentKeyword = Session.get("currentKeyword") != null?Session.get("currentKeyword"):"";
			
			if(!currentKeyword){
				Session.set("currentKeyword",text);
				console.log("asd");
				console.log(text);
				// text = "";
			}
			if (text != currentKeyword) {
				text = currentKeyword + " " + text;
			}else
			{
				text += " ";
			}
			// chosenText = Template.search.inputTex;
			// console.log(text);
			
			// text = $(e.target).val();
			text = text.trim();
			$(e.target).val(text);
		}
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
	// Session.set("currentKeywordSelected","");
	// Session.set("currentKeywords",{});
	Session.set("queryResults",null);
	Session.set("queryResultsCollections",null);

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

Template.search.rendered = function  () {

	 $('#btn-advanced-search').on('click',function(){
        $('div#advanced-search').removeClass('hidden');
        $(this)
    });

    $('#close').on('click', function(){
        $('div#advanced-search').addClass('hidden');
    });
    
	currentKeywords = Session.get("currentKeywords");
	for(key in currentKeywords)
	{
		console.log(key);
		$(".query-results [data-id="+currentKeywords[key]+"]").hide();	
	}
	// console.log($(".query-results li[selected=true]"));
    $(".query-results")
        .children()
        .first()
        .css(activeClass)
        .attr('selected','true');
}