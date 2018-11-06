



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


$("button").on("click", function(event) {
    event.preventDefault();
    ingredient = $("#recipeSearch").val().trim();
    ingrNoSpace = ingredient.replace(/ /g, "+");
    recipeSearch(ingrNoSpace);
})


