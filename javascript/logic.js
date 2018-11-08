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


    //this will be used in the ajax call
    var recipe = {
        "title": recipeTitle,
        "ingr": recipeIngredints
    }
    console.log(recipe);


    //   $.ajax({
    //     method: "POST",
    //     url: "https://api.edamam.com/api/nutrition-details?app_id=ce13381c&app_key=4967284ccc86e52d874362eb512b2e94",
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     data: JSON.stringify(recipe)
    //   }).then(function(response) {
    //     console.log(response);
    //   })
};



// yummily recipe code

var queryURL;
var ingredient;
var ingrNoSpace;
var params = [];
var refinedQuery;


//Ignore this code for the parameter selection, we may need to icebox this functionality until everything else is working smoothly
//append allergy and course search parameters to end of url
$('#collapseOne').on('change', ':checkbox', function () {

    params = [];
    $("#collapseOne input[type=checkbox]").each(function () {
        if ($(this).is(':checked')) {
            console.log($(this).val())
            params.push("&allowedCourse[]=course^course-" + $(this).val());

        }
    })
    console.log(params);


});



//runs the ajax call to get info based on search terms
function recipeSearch(ingredient) {

    queryParams = params.join("")

    queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient + queryParams + "&maxResult=3&requirePictures=true"

    // console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (var i = 0; i < response.matches.length; i++) {

            ingrId = response.matches[i].id;

            grabFullRecipe()
        }



    })
}




//pulls the search term value to feed to the url in the recipesearch function
$("#button").on("click", function (event) {
    event.preventDefault();

    if ($("#recipeSearch").val() === "") {

        //Adding user validation on search field 
        $('#recipeSearch').after('<span class="error">This field is required</span>');

    } else {

            $("#recipeCards").empty();
            ingredient = $("#recipeSearch").val().trim();
            //replaces white space with '+' signs to encode for URL
            ingrNoSpace = ingredient.replace(/ /g, "+");
            //gives the URL encoded search term argument to the recipesearch function
            recipeSearch(ingrNoSpace);
            $("#recipeSearch").val("");

    }

});


//this function takes the returned recipe from the search function and pulls the data we need to get nutritional values
function grabFullRecipe() {

    var queryURL = "http://api.yummly.com/v1/api/recipe/" + ingrId + "?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //this gets entered into the nutrition function
        recipeTitle = response.name;
        recipeIngredints = response.ingredientLines;
        console.log(recipeTitle);
        console.log(recipeIngredints);
        console.log(response); //pulls full recipe with images 
        getNutrition()

        //appending the recipe cards to the page
        var recipeDiv = $("<div>");
        recipeDiv.addClass("card");
        recipeDiv.attr({ "style": "18rem" });

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

        var cardList2 = $("<li>");
        cardList2.addClass("list-group-item");
        cardList2.text(response.source.sourceRecipeUrl); //url of recipe

        var cardList3 = $("<li>");
        cardList3.addClass("list-group-item");
        cardList3.text(response.totalTime); //time to cook recipe

        cardContents.append(cardList1);
        cardContents.append(cardList2);
        cardContents.append(cardList3);

        cardBody.append(title);
        cardBody.append(cardContents);

        recipeDiv.append(title);
        recipeDiv.append(cardBody);

        $("#recipeCards").append(recipeDiv);


    });

};





