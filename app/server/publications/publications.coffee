
Meteor.publish 'autocompleteKeywords', (query) ->
  Keywords.find
    name: new RegExp(query, 'i'),
      sort: { name: -1 },
      limit:20
console.log "jasd"
for colName of Collections
  console.log colName 
  Meteor.publish "autocomplete#{colName}", (query) ->
    Collections[colName].find
      name: new RegExp(query, 'i'),
        sort: { name: -1 },
        limit:20 