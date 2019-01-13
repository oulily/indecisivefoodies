function getPlacesNearby(){
  console.log('getPlacesNearby')
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response);
      placeNames(resp.results);
    }
  }

  request.open("GET", proxyurl + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4");
  console.log('sending request to places')
  request.send();
}

function placeNames(results) {
  console.log('placenames')
  // for (var i = 0; i < 6; i++) {
    document.getElementById("first").innerHTML = results[0].name;
    document.getElementById("second").innerHTML = results[1].name;
    document.getElementById("third").innerHTML = results[2].name;
    document.getElementById("fourth").innerHTML = results[3].name;
    document.getElementById("fifth").innerHTML = results[4].name;
    document.getElementById("sixth").innerHTML = results[5].name;
  // }
}

function placePics(results){
  console.log('placepics')
  document.getElementById("firstpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[0].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";
  document.getElementById("secondpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[1].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";
  document.getElementById("thirdpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[2].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";
  document.getElementById("fourthpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[3].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";
  document.getElementById("fifthpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[4].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";
  document.getElementById("sixthpic").src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[5].photos[2] + "&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4";

}
function placeRatings(results){
  console.log('placeratings')
  document.getElementById("firstrate").innerHTML = results[0].rating;
  document.getElementById("secondrate").innerHTML = results[1].rating;
  document.getElementById("thirdrate").innerHTML = results[2].rating;
  document.getElementById("fourthrate").innerHTML = results[3].rating;
  document.getElementById("fifthrate").innerHTML = results[4].rating;
  document.getElementById("sixthrate").innerHTML = results[5].rating;
}
getPlacesNearby();
