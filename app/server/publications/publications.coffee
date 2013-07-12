Meteor.publish 'autocompleteKeywords', (query) ->
  Keywords.find
    name: new RegExp(query, 'i'),
      fields: { name: 1 },
      limit: 5