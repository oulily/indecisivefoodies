function getPlacesNearby(){
  console.log('getPlacesNearby')

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  var request = new XMLHttpRequest();
  var res;
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var resp = JSON.parse(request.response);
      res = resp.results;
    }
  }

  request.open("GET", proxyurl + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+isla+vista&key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4");
  console.log('sending request to places')
  request.send();
  return res;
}

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

placeNames(getPlacesNearby())
