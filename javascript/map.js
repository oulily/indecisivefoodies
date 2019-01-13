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
  var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + ref + '&key=AIzaSyAbzn5BJaxvdYIzkExoQHnZkq5hVIvMCeI';
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
    if (location == '/nearby.html') {
      var ref = resp[i].photos[0].photo_reference;
      //if current page is nearby.html
      getPhoto(ref);
    } else if (location == '/GO.html') {
      //if current page is go.html
      createMarker(resp[i]);
    }
  }
  addPlace(resp);
}

  // placeNames(resp);


function getPhoto(ref) {
  console.log('getPhoto')
  var server = 'http://localhost:3001/?url='+ encodeURIComponent(url);
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
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+'position.coords.latitude'+','+'position.coords.longitude'+'&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4'
  // currentLocation = {
  //   lat: position.coords.latitude,
  //   lng: position.coords.longitude
  // };
  // console.log(currentLocation)
  getPlacesNearby();

}
