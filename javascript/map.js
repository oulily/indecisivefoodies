// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infoWindow;
var type= 'food';
var currentLocation;

window.onload = function(){
  window.setTimeout(initMap, 500);
}

function initMap() {
  console.log('initMap')

  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow();
  getCurrentLocation();
}
function getPlacesNearby(){
  console.log('getPlacesNearby')

  //add current location
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4'

  var server = 'http://localhost:8080/?url='+ encodeURIComponent(url);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response).results;
      onPlacesSuccess(resp);
    }
  }
  request.open('GET', server);
  console.log('sending request to places')
  request.send();
  var service = new google.maps.places.PlacesService(map);
}

function onPlacesSuccess(resp) {
  console.log('onPlacesSuccess')

  var location = window.location.path
  for (var i = 0; i < resp.length; i++) {
    debugger;
    if (location == '/swipe.html') {
      var ref = resp[i].photos[0].photo_reference;
      getPhoto(ref);
  }
  addPlace(resp);
}

  // placeNames(resp);


function getPhoto(ref) {
  console.log('getPhoto')
  var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + ref + '&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4'
  var server = 'http://localhost:8080/?url='+ encodeURIComponent(url);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      request.open('GET', server);
      request.send();
    }
  }
  request.open('GET', server);
  request.send();
}

function createMarker(place) {
  console.log('createMarker')

  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

function getCurrentLocation(){
  console.log('getCurrentLocation')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onPositionSuccess, function(error) {
      console.log(error.message);
      handleLocationError(true);
    });
  } else {
    handleLocationError();
  }
}
function handleLocationError(browserHasGeolocation) {
  console.log('handleLocationError')

    if (browserHasGeolocation){
      console.log('Error: The Geolocation service failed.');
    } else {
      console.log('Browser doesnt support Geolocation');
    }
}
function onPositionSuccess(position) {
  console.log('onPositionSuccess')
  currentLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(currentLocation)
  var infoWindow = new google.maps.InfoWindow({map: map});
  infoWindow.setPosition(currentLocation);
  infoWindow.setContent('Location found.');
  map.setCenter(currentLocation);
  getPlacesNearby();

}

// function clicker(){
//     document.getElementById("nature").onclick=function(){
//       type= str.replace('',"park");
//     };
//     document.getElementById("shopping").onclick=function(){
//        type= str.replace('',"shopping_mall");
//     };
//     document.getElementById("food").onclick=function() {
//        type= str.replace('',"food");
//     };
//     document.getElementById("popularattractions").onclick=function() {
//        type= str.replace('',"food");
//     };
//     document.getElementById("museums").onclick=function() {
//      type= str.replace('',"museum");
//     };
//     document.getElementById("all").onclick=function(){
//      type= str.replace('',"point_of_interest");
//     };



function placeNames(results) {
  console.log('placeNames')
  for (var i = 0; i < 6; i++) {
    document.getElementById("first").innerHTML = results[0].name;
    document.getElementById("second").innerHTML = results[1].name;
    document.getElementById("third").innerHTML = results[2].name;
    document.getElementById("fourth").innerHTML = results[3].name;
    document.getElementById("fifth").innerHTML = results[4].name;
    document.getElementById("sixth").innerHTML = results[5].name;
  }
}

function addPlace(results) {
  console.log('addPlace')
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      document.getElementById("one").onclick = function hello(){
        console.log('one is clicked');
        document.getElementById("trip1").innerHTML = results.name;
      };

      document.getElementById("two").onclick = function(){
        document.getElementById("trip2").innerHTML = results[1].name;
      };

      document.getElementById("three").onclick = function(){
        document.getElementById("trip3").innerHTML = results[2].name;
      };

      document.getElementById("four").onclick = function(){
        document.getElementById("trip4").innerHTML = results[3].name;
      };

      document.getElementById("five").onclick = function(){
        document.getElementById("trip5").innerHTML = results[4].name;
      };

      document.getElementById("six").onclick = function(){
        document.getElementById("trip6").innerHTML = results[5].name;
      };
    }
  }
