<script runat="server">
Platform.Load("core", "1.1.1");
/***********************************************
*   
*   // To use these functions within your script use the
*   // the following two lines to initialize the apiConfig settings
*   // and set your accessToken variable.
*   
*   var apiConfig = getAPIConfig();
*   var accessToken = auth(apiConfig, debug, runID); 
***********************************************/

/***********************************************
*
*   function getAPIConfig()
*   Sets all Credentials for RestAPI
*
***********************************************/

  function getAPIConfig() {
    return {
      authBase:"authentication_uri",
      restBase:"rest_uri",
      contentType:"application/json",
      grantType:"client_credentials",
      mid: "parentMID",
      clientID:"client_id",
      clientSecret:"client_secret"
    };
  };

</script>