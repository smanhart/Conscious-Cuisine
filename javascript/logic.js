//Nutrition API call

//these variables are reset in the yummly code and then used in the edamam function
var recipeTitle;
var recipeIngredints;
var titleObj;
var ingObj;
var ingrId;

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
    //url: "https://api.edamam.com/api/nutrition-details?app_id=816d5d34&app_key=df18daa5c0552a3eeceab2e56ffa2438",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(recipe)
  }).then(function(response) {
    console.log(response);
  })
};

function addNutrition

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
    
    queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient + "&maxResult=3&requirePictures=true"

    refinedQuery = queryURL + params.pURL;
    console.log(params.pURL);
    console.log(refinedQuery);
    
    $.ajax({
        url: refinedQuery,
        method: "GET"
    }).then(function(response) {
        console.log(response)


        //I've temporarily taken out the for loop until we can get a click event so only one recipe is pulled for nutrition info
        for ( var i = 0; i < response.matches.length; i++) {
           
            ingrId = response.matches[i].id;
            console.log(recipeTitle);
            console.log(recipeIngredints);

            //we can put the code to put this on the page here, or we might just use the code from the selected recipe in getfullrecipe function

            grabFullRecipe()
        }
 

       
    })
}




//pulls the search term value to feed to the url in the recipesearch function
$("#button").on("click", function(event) {

    event.preventDefault();
    ingredient = $("#recipeSearch").val().trim();
    //replaces white space with '+' signs to encode for URL
    ingrNoSpace = ingredient.replace(/ /g, "+");
    //gives the URL encoded search term argument to the recipesearch function
    recipeSearch(ingrNoSpace);


    //Adding user validation on search field  
    $(".error").remove();
   
      if (ingredient.length < 1 & params.length < 1) {

        console.log("This field is required")
        $('#recipeSearch').after('<span class="error">This field is required</span>');
      }


});


//this function takes the returned recipe from the search function and pulls the data we need to get nutritional values
function grabFullRecipe() {
 
    var queryURL = "http://api.yummly.com/v1/api/recipe/" + ingrId + "?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //this gets entered into the nutrition function
        recipeTitle = response.name;
        recipeIngredints = response.ingredientLines;
        console.log(response); //pulls full recipe with images 
        getNutrition()

            //appending the recipe cards to the page
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card");
            recipeDiv.attr({"style": "18rem"});

            var image = $("<img>");
            image.addClass("card-img-top");
            image.attr("src", response.images[0].hostedMediumUrl); //card image

            recipeDiv.append(image);

            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            var title = $("<h5>");
            title.addClass("card-title");
            title.text(response.name); //recipe title

            var cardContents = $("<ul>");
            cardContents.addClass("list-group list-group-flush");

            var cardList1 = $("<li>");
            cardList1.addClass("list-group-item");
            cardList1.text(response.source.sourceDisplayName); //source of recipe

            var cardList2 = $("<a>");
            cardList2.addClass("list-group-item");
            cardList2.text("View Recipe");
            cardList2.attr('target', '_blank');
            cardList2.attr("href", response.attribution.url);     //url of recipe

            var cardList3 = $("<li>");
            cardList3.addClass("list-group-item");
            cardList3.text(response.totalTime); //time to cook recipe

            //Accordian for nutrition info
            var accordian = $("<div>");
            accordian.attr("id", "accordian");

            var accCard = $("<div>");
            accCard.addClass("card");

            var accCardHeader = $("<div>");
            accCardHeader.addClass("card-header");
            accCardHeader.attr("id", "nutriHeading");

            var nutriHeading = $("<h5>");
            nutriHeading.addClass("mb-0");

            var collapseBtn = $("<button>");
            collapseBtn.addClass("btn btn-link");
            collapseBtn.attr("data-toggle", "collapse");
            collapseBtn.attr("data-target", "#collapseNutri");
            collapseBtn.attr("aria-expanded", "true");
            collapseBtn.attr("aria-controls", "collapseOne");
            collapseBtn.text("Nutrition Information");
            
            //Putting all the elements together for the recipe cards
            cardContents.append(cardList1);
            cardContents.append(cardList2);
            cardContents.append(cardList3);

            cardBody.append(title);
            cardBody.append(cardContents);

            recipeDiv.append(title);
            recipeDiv.append(cardBody);

            //Adding the accordian to the recipe card
            accordian.append(accCard);
            accCard.append(accCardHeader);
            accCardHeader.append(nutriHeading);
            nutriHeading.append(collapseBtn);

            recipeDiv.append(accordian);

            $("#recipeCards").append(recipeDiv);
        

    });

    };





