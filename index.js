const Router = require('./router')
const whiteList = require('./whitelist')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    };
    const body = JSON.stringify({ some: 'json' });
    return new Response(body, init)
}

function keepWhiteListParams(url) {
    let params = new URLSearchParams(url.search.slice(1));

    console.log("params: ", params, params.toString(), params.has("q"));
    console.log("Contains: ", whiteList.whiteList);

    // removing unnecessary params
    for(var key of params.keys()) { 
        if(!whiteList.whiteList.includes(key)){
            params.delete(key);
        }        
    }

    const newUrl = url.origin + url.pathname + "?" + params.toString();

    return newUrl;
}

async function sanitizeRequest(request) {
    const url = new URL(request.url);
    const sanitizedUrl = keepWhiteListParams(url);

    console.log("SanitizedUrl: ", sanitizedUrl);

    const updatedReq = new Request(sanitizedUrl, {
        body: request.body,
        headers: request.headers,
        method: request.method,
        redirect: request.redirect
    });

    console.log("UpdatedReq: ", updatedReq);
    const response = await fetch(updatedReq);
    return response;
}

async function handleRequest(request) {
    const r = new Router();
    r.get('.*/search.*', request => sanitizeRequest(request)); // return the response from the origin
    r.get('.*/test', () => new Response('Hello worker!')); // return a default message for the root route

    const resp = await r.route(request);
    return resp;
}
