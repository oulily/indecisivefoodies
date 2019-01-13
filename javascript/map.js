var currentLocation;


function getPlacesNearby(){
  console.log('getPlacesNearby')

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
<<<<<<< HEAD
=======

>>>>>>> fb3f6c87c9e44b0b083f359142acdfa27604e5d4
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response);
      console.log(resp.results.name);
      onPlacesSuccess(resp);
    }
  }
<<<<<<< HEAD


  request.open('GET', proxyurl+"https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4");
  console.log('sending request to places')
  request.send();

=======



  // header("Access-Control-Allow-Credentials:true");

  request.open("GET", proxyurl + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4");

  console.log('sending request to places')
  request.send();
>>>>>>> fb3f6c87c9e44b0b083f359142acdfa27604e5d4
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
