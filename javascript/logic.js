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


// yummily recipe code


var queryURL; 
var ingredient;
var ingrNoSpace;
var params = [];
var refinedQuery;

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
    
    queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient + "&requirePictures=true"
   
   
   

refinedQuery = queryURL + params;
console.log(refinedQuery);
    
    // $.ajax({
    //     url: refinedQuery,
    //     method: "GET"
    // }).then(function(response) {
    
    //     // var results = response.data
    //     console.log(response)
    // })
}


$("#button").on("click", function(event) {
    event.preventDefault();
    ingredient = $("#recipeSearch").val().trim();
    ingrNoSpace = ingredient.replace(/ /g, "+");
    recipeSearch(ingrNoSpace);

    //Adding user validation on search field  
    $(".error").remove();
   
      if (ingredient.length < 1 & params.length < 1) {

        console.log("This field is required")
        $('#recipeSearch').after('<span class="error">This field is required</span>');
      }
})



//     // var results = response.data
//     console.log(response)
// }) 
})
