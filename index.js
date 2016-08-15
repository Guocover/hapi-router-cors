/**
 * set route-level cors 
 * @author coverguo
 */

'use strict';

var CORS_HOST_LIST = {};

function isTopHost(origin, corsHost) {
    var lastIndex = origin.lastIndexOf(corsHost);
    var originLength = origin.length;
    var corsHostLength = corsHost.length;

    // console.log('lastIndex', lastIndex);
    // console.log('originLength', originLength);
    // console.log('corsHostLength', corsHostLength);
    if (lastIndex === -1) {
        return false;
    }

    if (originLength - lastIndex !== corsHostLength) {
        return false;
    }

    return true;

}

function routerCors(request, reply) {
    //has no origin ,just return;
    if (!request.headers.origin) {
        return reply.continue();
    }
    // depending on whether we have a boom or not,
    // headers need to be set differently.
    var response = request.response.isBoom ? request.response.output : request.response;

    //get the route setting
    // console.log(request.route.settings);
    var settings = request.route.settings;
    if (!settings.cors || !settings.cors.origin) {
        return reply.continue();
    }

    var originList = settings.cors.origin;
    // remove http:// or https://
    var origin = request.headers.origin.replace(/http(s)?:\/\//, '');
    originList.forEach(function(corsHost) {
        if (origin === corsHost || corsHost === '*' || isTopHost(origin, corsHost)) {
            response.headers['access-control-allow-origin'] = request.headers.origin;
            response.headers['access-control-allow-credentials'] = 'true';
        }
    });

    if (request.method !== 'options') {
        return reply.continue();
    }

    response.statusCode = 200;
    response.headers['access-control-expose-headers'] = 'content-type, content-length, etag';
    response.headers['access-control-max-age'] = 60 * 10; // 10 minutes
    // dynamically set allowed headers & method
    if (request.headers['access-control-request-headers']) {
        response.headers['access-control-allow-headers'] = request.headers['access-control-request-headers'];
    }
    if (request.headers['access-control-request-method']) {
        response.headers['access-control-allow-methods'] = request.headers['access-control-request-method'];
    }

    reply.continue();
}



exports.register = function(server, options, next) {

    server.ext('onPreResponse', routerCors);
    next();
};



exports.register.attributes = {
    pkg: require('./package.json')
};
