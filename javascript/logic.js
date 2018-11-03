var ingredient = "chicken"

// var queryURL = "https://api.yummly.com/v1_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient
var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=1bdad67c&_app_key=d635ffbe690df5a2a7005bdce55a1164&q=" + ingredient

console.log(queryURL)

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    // var results = response.data
    console.log(response)
})