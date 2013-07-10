Template.home.rendered = ->


  $("#btn-advanced-search").on "click", ->
    console.log "click"
    $("div#advanced-search").toggle()



  $("a[href=#sugerencias]").click ->
    $("#myModal").modal "show"

  $("#btnModalClose").click ->
    $("#myModal").modal "show"

  $("#myTab a").click (e) ->
    e.preventDefault()
    $(this).tab "show"


#Chosen Initializer
#$(".chzn-select").chosen();