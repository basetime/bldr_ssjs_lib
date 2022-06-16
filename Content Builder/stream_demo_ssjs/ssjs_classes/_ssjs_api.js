<script runat="server">
Platform.Load("core", "1.1.1");

function api() {

    var fn = {}

    fn.auth = function(config) {
        if (!config) { return 'configuration required'; }
        if (!config.clientID) { return 'clientID required'; }
        if (!config.clientSecret) { return 'clientSecret required'; }
        if (!config.grantType) { return 'grantType required'; }
        if (!config.authBase) { return 'authBase required'; }
        if (!config.mid) { return 'account mid required'; }

        var authPayload = {
            client_id: config.clientID,
            client_secret: config.clientSecret,
            grant_type: config.grantType,
            account_id: config.mid
        }

        try {
            var req = new Script.Util.HttpRequest(config.authBase + "v2/token");
            req.emptyContentHandling = 0;
            req.retries = 2;
            req.continueOnError = true;
            req.contentType = "application/json"
            req.method = "POST";
            req.postData = Stringify(authPayload);

            var resp = req.send();
            var resultStr = String(resp.content);
            var resultJSON = Platform.Function.ParseJSON(resultStr);

            var response = resultJSON["Response"][0];
            var accessToken = resultJSON.access_token;

            return accessToken;

        } catch (err) {
            return err
        }
    }


    fn.scriptUtil = function(config, accessToken) {
        if (!config) { return 'configuration is reqired' }
        if (!config.url) { return 'configuration url is required' }
        if (!accessToken) { return 'unauthenticated' }

        try {
            var req = new Script.Util.HttpRequest(config.url);
            req.emptyContentHandling = 0;
            req.retries = 2;
            req.continueOnError = true;
            req.contentType = "application/json"
            req.method = "GET";
            req.setHeader("Authorization", "Bearer " + accessToken);

            var resp = req.send();
            var resultStr = String(resp.content);
            var resultJSON = Platform.Function.ParseJSON(resultStr);

            return resultJSON;
        } catch (err) {
            return err
        };
    }

    fn.loadS2SConfig = function(client, mid){
            if(!client) { return 'client configuration is required' }
             
        return {
            authBase: "https://" + client.subdomain + ".auth.marketingcloudapis.com/",
            restBase: "https://" + client.subdomain + ".rest.marketingcloudapis.com/",
            clientID: client.s2s.clientID,
            clientSecret: client.s2s.clientSecret,
            grantType: "client_credentials",
            mid: !mid ? client.parentMid : mid
        }
    }
    return fn
}



</script>