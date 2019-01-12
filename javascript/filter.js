WebSettings ws = wv.getSettings();
ws.setJavaScriptEnabled(true);
wv.addJavascriptInterface(new Object()
{
  public void performClick()
  {
    window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
}; //gets users geolocation

  ?location=startPos.coords.latitude,startPos.coords.longitude
  &radius=5000
  &types=food
  &key=AIzaSyCjBjBHM4KRgn5WDcF_f4RxCRAGTT4dsr4


}
