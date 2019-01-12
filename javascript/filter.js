WebSettings ws = wv.getSettings();
ws.setJavaScriptEnabled(true);
wv.addJavascriptInterface(new Object()
{
  public void performClick()
  {
    // search yelp apis
}
