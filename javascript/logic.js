//Nutrition API call

//these variables are reset in the yummly code and then used in the edamam function
var recipeTitle;
var recipeIngredints;
var titleObj;
var ingObj;

//once we have a nutrition button created, then this can be called in an onclick event
function getNutrition() {

// var app_key = 'df18daa5c0552a3eeceab2e56ffa2438';
// var app_id = '816d5d34';

//   var recipe = {
//     "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
//     "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
//     "yield": "About 15 servings",
//     "ingr": [
//       "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
//       "7 cloves garlic, minced",
//       "1 tablespoon caraway seeds, crushed",
//       "4 teaspoons salt",
//       "Freshly ground pepper to taste",
//       "1 teaspoon olive oil",
//       "1 medium onion, peeled and chopped",
//       "3 cups sourdough rye bread, cut into 1/2-inch cubes",
//       "1 1/4 cups coarsely chopped pitted prunes",
//       "1 1/4 cups coarsely chopped dried apricots",
//       "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
//       "2 teaspoons chopped fresh rosemary",
//       "1 egg, lightly beaten",
//       "1 cup chicken broth, homemade or low-sodium canned"
//     ]
//   }



    //this will be used in the ajax call
    var recipe = {
        "title" : recipeTitle,
        "ingr" : recipeIngredints
    }
     console.log(recipe);


  $.ajax({
    method: "POST",
    url: "https://api.edamam.com/api/nutrition-details?app_id=816d5d34&app_key=df18daa5c0552a3eeceab2e56ffa2438",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(recipe)
  }).then(function(response) {
    console.log(response);
  })
};



// yummily recipe code

var queryURL; 
var ingredient;
var ingrNoSpace;
var params = [];
var refinedQuery;


//Ignore this code for the parameter selection, we may need to icebox this functionality until everything else is working smoothly
    //append allergy and course search parameters to end of url
    $('#accordion').on('change', ':checkbox', function ()  {
        if ($(this).is(':checked')) {
                console.log($(this).val() + ' is now checked');
                // console.log(params);
            var ckId = $(this).val();
            // params.push({ckId : "&allowedCourse[]course^course-" + ckId});
            
  
            function addParam(pId, pURL) {
                params.push({pId, pURL});
            }
            addParam(ckId, "&allowedCourse[]course^course-" + ckId);
            console.log(params);
    
        } else {

            //I can't figure out how to find the index because I change the value in line 82 before it's pushed to the array
            for (var i = 0; i < params.length; i++){
            var index = params.indexOf($(this).val())
            console.log(index);
            if (index[i] > -1) {
                params.splice(i, 1);

            }
            console.log(params);
        }
        }
        
        
    });
 


//runs the ajax call to get info based on search terms
function recipeSearch(ingredient) {
    
    queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient + "&requirePictures=true"

    refinedQuery = queryURL + params.pURL;
    console.log(params.pURL);
    console.log(refinedQuery);
    
    $.ajax({
        url: refinedQuery,
        method: "GET"
    }).then(function(response) {
        console.log(response)


        //I've temporarily taken out the for loop until we can get a click event so only one recipe is pulled for nutrition info
        // for ( var i = 0; i < response.matches.length; i++) {
            recipeTitle = response.matches[3].recipeName;
            recipeIngredints = response.matches[3].ingredients;
            console.log(recipeTitle);
            console.log(recipeIngredints);

            //this is the function from the edamam code
            getNutrition()
        // }
 


       



       
    })
}

//pulls the search term value to feed to the url in the recipesearch function
$("button").on("click", function(event) {
    event.preventDefault();
    ingredient = $("#recipeSearch").val().trim();
    //replaces white space with '+' signs to encode for URL
    ingrNoSpace = ingredient.replace(/ /g, "+");
    //gives the URL encoded search term argument to the recipesearch function
    recipeSearch(ingrNoSpace);
});




