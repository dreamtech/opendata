
Meteor.publish 'autocompleteKeywords', (query) ->
  Keywords.find
    name: new RegExp(query, 'i'),
      sort: { name: -1 },
      limit:20