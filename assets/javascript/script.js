
// searchButton.addEventListener("click", getWeatherData);


var apiUrl = "api.openweathermap.org/data/2.5/weather?q=phoenix&appid=eda4403bd9c90cb2bfa5115b8964ea2f"
// var searchButton = document.querySelector("#searchButton");
var searchButton = document.getElementById("searchButton");

var cityinput = document.querySelector("#city-search");
// Current City Display Variables
var cityName = document.querySelector("#cityName");
var date = document.querySelector("#date");
var weatherIcon = document.querySelector("#weatherIcon");
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#windSpeed");
var uvIndex = document.querySelector("#uvIndex");

var getWeatherData = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=eda4403bd9c90cb2bfa5115b8964ea2f");
    console.log("data");
     
    // fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityinput+"&appid=eda4403bd9c90cb2bfa5115b8964ea2f");

};

getWeatherData();
// var getWeatherData = function(data) {
//     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityinput+"&appid=eda4403bd9c90cb2bfa5115b8964ea2f";
//     fetch(apiUrl).then(function(response) {
//         // successful response
//         if (response.ok) {
//             response.json().then(function(data){
//                 displayCurrentWeather();
//                 console.log(data);
//             });
//         }else {
//             alert("City Data Not Found");
//         }
//     });
// }

// var displayCurrentWeather = function() {

// };