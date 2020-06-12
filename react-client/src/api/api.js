// Make API Request
function apiRequest(obj) {
    return new Promise((resolve, reject) => {

        // Error handling
        if (obj.url == undefined) reject("Missing Url");
        if (obj.method == undefined) reject("Missing Method");
        if (obj.proxyUrl == undefined) reject("Missing Proxy Url");
        if (obj.headers && typeof obj.headers === "object" && Array.isArray(obj.headers)){
            reject("TypeError: Headers must be an dictionary")
        };

        // Set headers
        let httpHeaders = {"Content-Type": "application/json"};
        if (obj.headers) httpHeaders = Object.assign(httpHeaders, obj.headers);

        // Deconstruction
        const {proxyUrl, method, url, body} = obj;
        const requestObject = {method: method, headers: httpHeaders};
        if (body) requestObject["body"] = JSON.stringify(body);

        // Request & Error handling
        fetch(proxyUrl + url, requestObject)
        .then(data => data.json())
        .then(json => resolve(json))
        .catch(err => reject({"ERROR": err}));
    });
}
export { apiRequest };