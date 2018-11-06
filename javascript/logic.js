//Nutrition API code
$(document).ready(function(){

// var app_key = 'df18daa5c0552a3eeceab2e56ffa2438';
// var app_id = '816d5d34';

    var title = "";
    var ingredients = [];

// var recipe should be a link to the response from Yummily
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
  };

  $.ajax ({
    method: "POST",
    url: "https://api.edamam.com/api/nutrition-details?app_id=816d5d34&app_key=df18daa5c0552a3eeceab2e56ffa2438",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(recipe)

  }).then(function(response) {
        console.log(response);
  });

  //get the recipes on screen by creating cards for them to be held
  //create a function that only does the edamam search on click
  //pull the ingredients and title from the recipe and put into edamam format
  //create an API request with the chosen recipe information
  //return the results to the html

//   $("#nutriSearch").on("click", function() { //PLEASE DON'T DELETE - work in progress :)

//     var chosenRecipe = $(".recipeName");
//     var dataAttr1 = recipeName.data("recipeName");
//     var dataAttr2 = recipeName.data("ingredients");


//   })



// yummily recipe code

    var ingredient;
    var ingrNoSpace;
    var params = [];
    var refinedQuery;
    var numResults = 0;
    var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient + "&requirePictures=true"



    //append allergy and course search parameters to end of url
    $('#accordion').on('change', ':checkbox', function () {
        if ($(this).is(':checked')) {
            // params.append("&allowedCourse[]", "course^course-" + $(this).val())
                console.log($(this).val() + ' is now checked');
                // console.log(params);
    
            params.push("&allowedCourse[]course^course-" + $(this).val());
            console.log(params);
            
    
        } else {
    
            params.splice(($(this).val()))
            console.log(params);
            
        }
        
        
    });


    function recipeSearch(ingredient) {
        
            refinedQuery = queryURL + params;
            console.log(refinedQuery);

        };



    $("button").on("click", function(event) {
        event.preventDefault();
        ingredient = $("#recipeSearch").val().trim();
        ingrNoSpace = ingredient.replace(/ /g, "+");
        recipeSearch(ingrNoSpace);

        console.log(refinedQuery);

        $.ajax({ //Stephanie -- I don't think this is taking in the ingrNoSpace when it searches
            url: refinedQuery,
            method: "GET"
          })
            .then(function(response) {
                 
              console.log(response); //getting the array to return! 
              //console.log(response.matches[i].recipeName);

                var recipeResults = response.matches[i]; //struggling with how to get to the information in the object

                console.log(recipeResults); //returning undefined
                
                for(var i = 0; i <response.length; i++) { //not currently working but this should get the card of the recipe on the page 
                    var recipeDiv = $("<div>");
                    recipeDiv.addClass("card");
                    recipeDiv.attr({"style": "18rem"});

                    var image = $("<img>");
                    image.addClass("card-img-top");
                    image.attr("src", response.matches[i].smallImageUrls[0]);

                    card.append(image);

                    var cardBody = $("<div>");
                    cardBody.addClass("card-body");

                    var title = $("<h5>");
                    title.addClass("card-title");
                    title.text(response.matches[i].recipeName);

                    cardBody.append(title);

                    $("#recipeCards").append(recipeDiv);

                    card.append(cardBody);
                }
       
        });
    
    });


    




});   
    // function isObject(o) {
    //     return typeof o == "object";
    //     }
    
    // function findTitleObj(obj, category, info) {
    //     for (key in obj) {
    //         if (key == "recipeName") {
    //         if (obj[key] == category) {
    //             console.log(info); 
    //         }

    //         }else{
    //         if (isObject(obj[key])) {
    //             findInObj(obj[key], category, key); // recursion
    //             }
    //         }
    //     }
    // };

    // function findIngrObj(obj, category, info) {
    //     for (key in obj) {
    //         if (key == "ingredients") {
    //         if (obj[key] == category) {
    //             console.log(info); 
    //         }

    //         }else{
    //         if (isObject(obj[key])) {
    //             findInObj(obj[key], category, key); // recursion
    //             }
    //         }
    //     }
    // };

    // findIngrObj(refinedQuery, "broccoli", "matches");







//     // var results = response.data
//    // console.log(response)};