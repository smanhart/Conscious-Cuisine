//Nutrition API call
$(document).ready(function(){

// var app_key = 'df18daa5c0552a3eeceab2e56ffa2438';
// var app_id = '816d5d34';

  var recipe = {
    "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
    "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
    "yield": "About 15 servings",
    "ingr": [
      "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
      "7 cloves garlic, minced",
      "1 tablespoon caraway seeds, crushed",
      "4 teaspoons salt",
      "Freshly ground pepper to taste",
      "1 teaspoon olive oil",
      "1 medium onion, peeled and chopped",
      "3 cups sourdough rye bread, cut into 1/2-inch cubes",
      "1 1/4 cups coarsely chopped pitted prunes",
      "1 1/4 cups coarsely chopped dried apricots",
      "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
      "2 teaspoons chopped fresh rosemary",
      "1 egg, lightly beaten",
      "1 cup chicken broth, homemade or low-sodium canned"
    ]
  }

  $.ajax({
    method: "POST",
    url: "https://api.edamam.com/api/nutrition-details?app_id=816d5d34&app_key=df18daa5c0552a3eeceab2e56ffa2438",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(recipe)
  }).then(function(response) {
    console.log(response);
  })
// // Make the actual CORS request.
// $("#CORSRequest").on("click", function(event) {
//   event.preventDefault();
  
//   //let app_id = app_id;
//   //let app_key = app_key;
//   var app_key = 'df18daa5c0552a3eeceab2e56ffa2438';
//   var app_id = '816d5d34';
//   let recipe = recipeArray;
//   let pre = document.getElementById('response');

//   var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;

//   var xhr = createCORSRequest('POST', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   };

//    // Response handlers.
//    xhr.onload = function() {
//     var text = xhr.responseText;
//     pre.innerHTML = text;
//   };

//   xhr.onerror = function() {
//     alert('Whoops, there was an error making the request.');
//   };

//   pre.innerHTML = 'Loading...';
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.send(recipe);
// });

});

// $(document).ready(function() {

//   var APIKey = 'df18daa5c0552a3eeceab2e56ffa2438';

//   var appId = '816d5d34';

//   var queryURLBase = 'https://api.edamam.com/api/nutrition-details?app_id=$' + appID + '&app_key=$' + APIKey;

//   var ingredientCounter = 0;

//   function runQuery(numIngredients, queryURLBase) {
//     $.ajax({url: queryURLBase, method: "GET"})
//     .done(function(ingredient) {
//       console.log(queryURLBase);
//       $("#wellSection").empty();

//     })
   
//   }

// });

//Napster API call

// $(document).ready(function() {

//   var APIKey = "MTE1MGMyZGYtN2JhNy00MjVhLTkwOTMtYTQyZTYwODA0OTk3";

//   var queryURLBase = "https://api.napster.com/v2.2/stations?apikey=" + APIKey;

//   var stationCounter = 0;

//   function runQuery(numStations, queryURLBase) {
//     $.ajax({url: queryURLBase, method: "GET"})
//     .done(function(napsterStations) {
//       console.log(queryURLBase);
//       $("#wellSection").empty();

//       for(var i=0; i<numStations; i++) {
//         console.log(napsterStations.responseJSON.stations[i]);
//       }
//     })
//     console.log(napsterStations);
//   }

// });
// const playlistTemplateSource = document.getElementById('playlist-template').innerHTML;
// const playlistTemplate = Handlebars.compile(playlistTemplateSource);

// const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
// const tracksTemplate = Handlebars.compile(tracksTemplateSource);

// const $playlist = $('#playlist-container');
// const $tracks = $('#tracks-container');
// const $mainTitle = $('.header');
// const $backButton = $('.back-button');


// const getTopPlaylists = $.get('https://api.napster.com/v2.2/stations?apikey=' + APIKey);

// // function getPlaylistTracks(id) { //grabbing playlist id, from the click event of the image of playlist
// //   return $.get('https://api.napster.com/v2.0/playlists/' + id + '/tracks?apikey=' + APIKey + '&limit=50');
// // }

// console.log(getTopPlaylists) //working

// }j);

// // $backButton.click(() => {
// 	$playlist.show();
//   $tracks.hide();
//   $mainTitle.text('Top Playlists');
//   $backButton.hide();
// });

// $backButton.hide(); // Initially hide back button.

// function changeToTracks(playlistName) {
// 	$mainTitle.text(playlistName);
//   $playlist.hide();
// 	$tracks.show();
//   $backButton.show();
  
//   return renderTracks;
// }

// function renderTracks(response) {
//   $tracks.html(tracksTemplate(response));
// }

// getTopPlaylists //get a list of the playlists
//   .then((response) => {
//     $playlist.html(playlistTemplate(response));
//     addStationListener();
//   });

// // function addPlaylistListener() {
// //   $('.cover').on('click', (e) => {
// //     const $playlist = $(e.target);
// //     getPlaylistTracks($playlist.data('playlistId')) //picture id is tagged and will pull the tracks from the cover image clicked
// //       .then(changeToTracks($playlist.data('playlistName')));
// //   });
// // }

// //Trying to get the Playlist working
// //const getTopPlaylists = $.get('https://api.napster.com/v2.0/stations/top?limit=5?apikey=' + APIKey);

// function getTopStations(id) {
//   return $.get('https://api.napster.com/v2.2/genres/g.115/stations?apikey=MTE1MGMyZGYtN2JhNy00MjVhLTkwOTMtYTQyZTYwODA0OTk3');
// }
// //console.log (id);

// function addStationListener() {
//   $('.cover').on('click', (e) => {
//     const $playlist = $(e.target);
//     getTopStations($playlist.data('playlistId')) //picture id is tagged and will pull the tracks from the cover image clicked
//       .then(changeToTracks($playlist.data('playlistName')));
//   });
// }


// });


//var ingredient = "chicken"

// var queryURL = "https://api.yummly.com/v1_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient
//var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient

// console.log(queryURL)

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {

//     // var results = response.data
//     console.log(response)
// })
