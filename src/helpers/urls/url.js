function getShareUrl() { 
    var isInIframe = (parent !== window);
    var parentUrl = null;
    shareUrl = (isInIframe) ? document.referrer : shareUrl = window.location.href;
    return shareUrl;  
}

function getURLParams(paramName) {
    var searchString = window.location.search.substring(1),
        i, val, params = searchString.split("&");

    for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
            return val[1];
        }
    }
    return null;
}