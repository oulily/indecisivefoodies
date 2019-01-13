var currentLocation;

window.onload = function(){
  window.setTimeout(initMap, 500);
}

function getPlacesNearby(){
  console.log('getPlacesNearby')
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Methods:GET,POST");
  header("Access-Control-Allow-Headers:Content-Type");
  header("Access-Control-Allow-Credentials:true");

  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4';
  var server = 'http://localhost:8080/?url='+ encodeURIComponent(url);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response);
      console.log(resp.results.name);
      onPlacesSuccess(resp);
    }
  }
  request.open('GET', server);
  console.log('sending request to places')
  request.send();
  var service = new google.maps.places.PlacesService(map);
}

// function getCurrentLocation(){
//   console.log('getCurrentLocation')
//
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(onPositionSuccess, function(error) {
//       console.log(error.message);
//       handleLocationError(true);
//     });
//   } else {
//     handleLocationError();
//   }
// }
// function handleLocationError(browserHasGeolocation) {
//   console.log('handleLocationError')
//
//     if (browserHasGeolocation){
//       console.log('Error: The Geolocation service failed.');
//     } else {
//       console.log('Browser doesnt support Geolocation');
//     }
// }
