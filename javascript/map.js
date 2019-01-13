var currentLocation;


function getPlacesNearby(){
  console.log('getPlacesNearby')

  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response);
      console.log(resp.results.name);
      onPlacesSuccess(resp);
    }
  }



  // header("Access-Control-Allow-Credentials:true");

  request.open('GET', url);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.setRequestHeader("Access-Control-Allow-Methods", "GET,POST");
  request.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
  console.log('sending request to places')
  request.send();
}

getPlacesNearby();
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
