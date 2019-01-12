WebSettings ws = wv.getSettings();
ws.setJavaScriptEnabled(true);
wv.addJavascriptInterface(new Object()
{
  public void performClick()
  {
    // search google apis
    window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
}; //gets users geolocation


}
