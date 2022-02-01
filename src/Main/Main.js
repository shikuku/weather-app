
import './Main.css';
import $ from 'jquery';



const main=()=>{

let api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  
})

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
    }
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}




    return(
        <div class="container">
        <div class="row">
          <header class="col-xs-12 text-center">
            <h1>MYC-<i class="wi wi-hail"></i>Tech</h1>
            <h1>Weather App</h1>
          </header>
    
          <div class="col-xs-8 col-xs-offset-2">
            <div class="text-center status">
              <p><span id="city"></span> <span id="country"></span></p>
              <p><span id="temp"></span><span class="temp" id="tempunit" ></span></p>
              <p id="desc"></p>
            </div>
    
            <div class="text-center all-icon">
              <div class="icon sun-shower hide ">
                <div class="cloud"></div>
                <div class="sun">
                  <div class="rays"></div>
                </div>
                <div class="rain"></div>
              </div>
              <div class="icon thunder-storm hide thunderstom">
                <div class="cloud"></div>
                <div class="lightning">
                  <div class="bolt"></div>
                  <div class="bolt"></div>
                </div>
              </div>
              <div class="icon cloudy hide clouds">
                <div class="cloud"></div>
                <div class="cloud"></div>
              </div>
              <div class="icon flurries hide snow">
                <div class="cloud"></div>
                <div class="snow">
                  <div class="flake"></div>
                  <div class="flake"></div>
                </div>
              </div>
              <div class="icon sunny hide clear">
                <div class="sun">
                  <div class="rays"></div>
                </div>
              </div>
              <div class="icon rainy hide rain">
                <div class="cloud"></div>
                <div class="rain"></div>
              </div>
            </div>
    
            <p class="text-center">Inspired By <a href="https://codepen.io/joshbader/full/EjXgqr/" target="_blank">steve</a></p>
          </div>
        </div>
      </div>
    
    
    
    
    )
}

export default main;