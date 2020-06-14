api = "https://images-api.nasa.gov/search?q=";

$("form").submit(function (e) {
  //it prevents form tag from submitting
  e.preventDefault();
});

$(".submit").click(function () {
  //when the user click on the search button...
  const text = $(".user-input");
  if (text.val()) {
    //if the user typed anything...
    let search = text.val();
    $.ajax({
      //this is responsible for retrieving the data from the api
      url: api + search,
      dataType: "json",
      async: true,
      success: function (api) {
        text.val("");
        if (api.collection.metadata.total_hits == "0") {
          //if there wasn't any result...
          $(".container").find("div.card").remove();
          //remove all the cards from the main container if there are any.
          const answer = $(
            "<p class='not-found' style='color:white;font-size:40px;text-align:center;'>Nothing Found</p>"
          );
          $(".container").find("p.not-found").remove();
          //if there is any not found on the screen already, remove it.
          answer.appendTo($(".container"));
          //and add another one.
        } else {
          //else if there are results...
          $(".container").find("p.not-found").remove();
          $(".container").find("div.card").remove();
          //remove the not found text and the results from the search before this one
          const temp = $(".card-temp").contents();
          for (i = 0; i < 100; i++) {
            let clone = temp.clone();
            clone.find("h1.title").html(api.collection.items[i].data[0].title);
            clone
              .find("img.img")
              .attr("src", api.collection.items[i].links[0].href);
            clone
              .find("p.description")
              .html(api.collection.items[i].data[0].description);
            clone.appendTo($(".container"));
            //add 100 cards with the first 100 results from the api in the main container
          }
        }
      },
    });
  }
});
