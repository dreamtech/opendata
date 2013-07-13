Meteor.publish("autocompleteCollections", function(collection,query) {
  if(collection){

  console.log("autocompleteCollections");
  console.log(collection);
  return  Collections[collection].find
                      ({name: new RegExp(query, 'i')}, 
                        {sort: {name: -1},limit: 20 }
                      );
  }
  return {};
});