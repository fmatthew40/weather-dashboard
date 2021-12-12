var uvChange = document.querySelector('#uvchange')
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
// five day display variables
var temperatureOne = document.querySelector("#temperature1");
var temperatureTwo = document.querySelector("#temperature2");
var temperatureThree = document.querySelector("#temperature3");
var temperatureFour = document.querySelector("#temperature4");
var temperatureFive = document.querySelector("#temperature5");

var humidityOne = document.querySelector("#humidity1");
var humidityTwo = document.querySelector("#humidity2");
var humidityThree = document.querySelector("#humidity3");
var humidityFour = document.querySelector("#humidity4");
var humidityFive = document.querySelector("#humidity5");

var windspeedOne = document.querySelector("#windspeed1");
var windspeedTwo = document.querySelector("#windspeed2");
var windspeedThree = document.querySelector("#windspeed3");
var windspeedFour = document.querySelector("#windspeed4");
var windspeedFive = document.querySelector("#windspeed5");

var dayoneIcon = document.querySelector("#weatherIcon1");
var daytwoIcon = document.querySelector("#weatherIcon2");
var daythreeIcon = document.querySelector("#weatherIcon3");
var dayfourIcon = document.querySelector("#weatherIcon4");
var dayfiveIcon = document.querySelector("#weatherIcon5");

var currentDisplayA = document.getElementById('currentDisplayArea');

searchButton.addEventListener("click", function(){
    fetchWeather(cityinput.value);
});

var fetchWeather = function(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=eda4403bd9c90cb2bfa5115b8964ea2f&units=imperial").then(function(response){
    if (response.ok) {
        response.json().then(function(data){
        // displayWeather(data);
        console.log(data);
        currentDisplay(data);

        var savedCities = localStorage.getItem("cities")
        savedCities = savedCities ? savedCities.split(',') : [];

        savedCities = savedCities.filter(function(localCity){
            return localCity.toLowerCase() !== city.toLowerCase();
        });

        savedCities.push(city);

       localStorage.setItem("cities", savedCities.join(','));
       loadCities();
        });
    } else {
        alert("Could not find city; try again.")
        }
    });

}

var currentDisplay = function(data) {
    var nameDisplay = data['name'];
    cityName.innerText = nameDisplay;
    $("#date").text(moment().format("dddd, MMMM Do YYYY"));
    var humidityDisplay = "Humidity: " + data['main']['humidity']+"%";
    humidity.innerText = humidityDisplay; 
    var temperatureDisplay = "Temperature: " + data['main']['temp']+"°F";
    temperature.innerText = temperatureDisplay;
    var windSpeedDisplay = "Wind Speed: " + data['wind']['speed']+" mph";
    windSpeed.innerText = windSpeedDisplay; 
    var imageCode = data.weather[0].icon;
    weatherIcon.setAttribute("src","http://openweathermap.org/img/w/" + imageCode + ".png")
   
    var lon = data.coord.lon;
    var lat = data.coord.lat;

    uvi(lon, lat);
};

var uvi = function(lon, lat) {
   
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=eda4403bd9c90cb2bfa5115b8964ea2f&units=imperial").then(function(response) {
    if (response.ok) {
    response.json().then(function(datab){
        console.log(datab)
        currentDisplayA.classList.remove('displaynone');

        var uvidisplay = datab['current']['uvi'];
        uvIndex.innerText = "UV Index: " +uvidisplay;
        setFiveDay(datab);
        showFiveDay(datab);
        uviColor(datab);
    });
    }else {
        console.log("error retrieving");
    };
        });
}; 

 var setFiveDay = function(datab){ 
    dateonearea = document.getElementById("date1");
    datetwoarea = document.getElementById("date2");
    datethreearea = document.getElementById("date3");
    datefourarea = document.getElementById("date4");
    datefivearea = document.getElementById("date5");

    var dayplusone = moment().add(1, 'day').format("dddd, MMMM Do YYYY");
    dateonearea.innerText = dayplusone;
    var dayplustwo = moment().add(2, 'day').format("dddd, MMMM Do YYYY");
    datetwoarea.innerText = dayplustwo;
    var dayplusthree = moment().add(3, 'day').format("dddd, MMMM Do YYYY");
    datethreearea.innerText = dayplusthree;
    var dayplusfour = moment().add(4, 'day').format("dddd, MMMM Do YYYY");
    datefourarea.innerText = dayplusfour;
    var dayplusfive = moment().add(5, 'day').format("dddd, MMMM Do YYYY");
    datefivearea.innerText = dayplusfive;
 };

 var showFiveDay = function(datab) {
    // temperatures for 5 day
    var temperatureDisplayOne =  "Temperature: " + datab['daily']['0']['temp']['day'] +"°F";
    temperatureOne.innerText = temperatureDisplayOne;
    var temperatureDisplayTwo =  "Temperature: " + datab['daily']['1']['temp']['day'] +"°F";
    temperatureTwo.innerText = temperatureDisplayTwo;
    var temperatureDisplayThree =  "Temperature: " + datab['daily']['2']['temp']['day'] +"°F";
    temperatureThree.innerText = temperatureDisplayThree;
    var temperatureDisplayFour =  "Temperature: " + datab['daily']['3']['temp']['day'] +"°F";
    temperatureFour.innerText = temperatureDisplayFour;
    var temperatureDisplayFive =  "Temperature: " + datab['daily']['4']['temp']['day'] +"°F";
    temperatureFive.innerText = temperatureDisplayFive;
    //  Wind Speed for 5 day
    var windDisplayOne =  "Wind Speed: " + datab['daily']['0']['wind_speed'] +" mph";
    windspeedOne.innerText = windDisplayOne;
    var windDisplayTwo =  "Wind Speed: " + datab['daily']['1']['wind_speed'] +" mph";
    windspeedTwo.innerText = windDisplayTwo;
    var windDisplayThree =  "Wind Speed: " + datab['daily']['2']['wind_speed'] +" mph";
    windspeedThree.innerText = windDisplayThree;
    var windDisplayFour =  "Wind Speed: " + datab['daily']['3']['wind_speed'] +" mph";
    windspeedFour.innerText = windDisplayFour;
    var windDisplayFive =  "Wind Speed: " + datab['daily']['4']['wind_speed'] +" mph";
    windspeedFive.innerText = windDisplayFive;
    //  Humidity for 5 day
    var humidityOneDisplay =  "Humidity: " + datab['daily']['0']['humidity'] +"%";
    humidityOne.innerText = humidityOneDisplay;
    var humidityTwoDisplay =  "Humidity: " + datab['daily']['1']['humidity'] +"%";
    humidityTwo.innerText = humidityTwoDisplay;
    var humidityThreeDisplay =  "Humidity: " + datab['daily']['2']['humidity'] +"%";
    humidityThree.innerText = humidityThreeDisplay;
    var humidityFourDisplay =  "Humidity: " + datab['daily']['3']['humidity'] +"%";
    humidityFour.innerText = humidityFourDisplay;
    var humidityFiveDisplay =  "Humidity: " + datab['daily']['4']['humidity'] +"%";
    humidityFive.innerText = humidityFiveDisplay;
    // Weather Icons for 5 day
    var imgOne = datab.daily[0].weather[0].icon
    dayoneIcon.setAttribute("src","http://openweathermap.org/img/w/" + imgOne + ".png");
    var imgTwo = datab.daily[1].weather[0].icon
    daytwoIcon.setAttribute("src","http://openweathermap.org/img/w/" + imgTwo + ".png");
    var imgThree = datab.daily[2].weather[0].icon
    daythreeIcon.setAttribute("src","http://openweathermap.org/img/w/" + imgThree + ".png");
    var imgFour = datab.daily[3].weather[0].icon
    dayfourIcon.setAttribute("src","http://openweathermap.org/img/w/" + imgFour + ".png");
    var imgFive = datab.daily[4].weather[0].icon
    dayfiveIcon.setAttribute("src","http://openweathermap.org/img/w/" + imgFive + ".png");
 }
// changes color on uvi 
 var uviColor = function (datab) {

    if (datab['current']['uvi'] <3) {
        uvChange.classList.remove('veryhigh-red');
        uvChange.classList.remove('high-orange');
        uvChange.classList.remove('extreme-purple');
        uvChange.classList.remove('moderate-yellow');
        uvChange.classList.add('lowgreen');
    }
    if (datab['current']['uvi'] > 2 && datab['current']['uvi'] < 6) {
        uvChange.classList.remove('high-orange');
        uvChange.classList.remove('extreme-purple');
        uvChange.classList.remove('lowgreen');
        uvChange.classList.remove('veryhigh-red');
        uvChange.classList.add('moderate-yellow');
    }
    if (datab['current']['uvi'] > 5 && datab['current']['uvi'] < 8) {
        uvChange.classList.remove('extreme-purple');
        uvChange.classList.remove('lowgreen');
        uvChange.classList.remove('veryhigh-red');
        uvChange.classList.remove('moderate-yellow');
        uvChange.classList.add('high-orange');
    }
    if (datab['current']['uvi'] > 7 && datab['current']['uvi'] < 11) {
        uvChange.classList.remove('extreme-purple');
        uvChange.classList.remove('lowgreen');
        uvChange.classList.remove('moderate-yellow');
        uvChange.classList.remove('high-orange');
        uvChange.classList.add('veryhigh-red');
    }
    if (datab['current']['uvi'] > 10) {
        uvChange.classList.remove('lowgreen');
        uvChange.classList.remove('moderate-yellow');
        uvChange.classList.remove('high-orange');
        uvChange.classList.remove('veryhigh-red');
        uvChange.classList.add('extreme-purple');
    }
 };


var loadCities = function() {

    var searchResultsArea = document.getElementById("search-results");
    // var searchButton = document.createElement("button");
    // console.log(searchButton);
    // innertext
    // searchButton.innerText = 

    var cities = localStorage.getItem("cities");
    cities = cities ? cities.split(",") : [];
    console.log(cityinput);


    // searchResultsArea.appendChild(searchButton);
    searchResultsArea.innerHTML = "";

    for (i =0; i < cities.length; i++) {
        var searchButton = document.createElement("button");
        searchButton.innerText = cities[i];
        searchButton.addEventListener("click", function(event){
            console.log(event)
            fetchWeather(event.target.innerText);
        });
        searchResultsArea.appendChild(searchButton);
        searchButton.classList.add('newbuttons');


    }
};

loadCities()