/*
 * Server settings for the API
 *
 */ 

//dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers');
var helpers = require('./helpers');
var fs = require('fs');
var path = require('path')
var config = require('./config')

//server container
var server = {}

//Create http Server
server.httpServer = http.createServer(function(req,res){
    server.unifiedServer(req,res);
})

//HTTPS options
server.httpsOptions = {
    'key': fs.readFileSync(__dirname+'/../https/key.pem'),
    'cert': fs.readFileSync(__dirname+'/../https/cert.pem')
}

//Create https Server
server.httpsServer = https.createServer(server.httpsOptions, function(req,res){
    server.unifiedServer(req.res);
})

server.unifiedServer = function(req, res){
    //parse the url
    var parsedUrl = url.parse(req.url, true);

    //get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //get the queries
    var queryStringObject = parsedUrl.query;

    //get the method
    var method = req.method.toLowerCase();

    //get the headers as an object
    var headers = req.headers;

    //get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = ''
    req.on('data',function(data){
        buffer+=decoder.write(data);
    })
    req.on('end',function(){
        buffer += decoder.end();

        //Check the matching handler from the path. If none is found, then not found handler is assigned
        var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        // If the request is within the public directory use to the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

        //Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        }

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload, contentType) {

            // Determine the type of response (fallback to JSON)
            contentType = typeof (contentType) == 'string' ? contentType : 'json';

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Return the response parts that are content-type specific
            var payloadString = '';
            if (contentType == 'json') {
                res.setHeader('Content-Type', 'application/json');
                payload = typeof (payload) == 'object' ? payload : {};
                payloadString = JSON.stringify(payload);
            }

            if (contentType == 'html') {
                res.setHeader('Content-Type', 'text/html');
                payloadString = typeof (payload) == 'string' ? payload : '';
            }

            if (contentType == 'favicon') {
                res.setHeader('Content-Type', 'image/x-icon');
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'plain') {
                res.setHeader('Content-Type', 'text/plain');
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'css') {
                res.setHeader('Content-Type', 'text/css');
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'png') {
                res.setHeader('Content-Type', 'image/png');
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'jpg') {
                res.setHeader('Content-Type', 'image/jpeg');
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(trimmedPath,statusCode);
        })
    })
}

//routers
server.router = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/delete': handlers.accountDelete,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'pizzas': handlers.pizzas,
    'order': handlers.orderComplete,
    'api/user': handlers.user,
    'api/tokens': handlers.tokens,
    'api/menu': handlers.menu,
    'api/order': handlers.order,
    'api/cart': handlers.cart,
    'favicon.ico': handlers.favicon,
    'public': handlers.public,
    'ping': handlers.ping,
}

//init the server
server.init = function(){
    //start the HTTP server
    server.httpServer.listen(config.httpPort,function(){
        console.log('The HTTP server is running on port '+config.httpPort);
    });
    //start the HTTPS server
    server.httpsServer.listen(config.httpsPort,function(){
        console.log('The HTTPS server is running on port '+config.httpsPort);
    });
}

//export the server
module.exports = server