/*
 * Primary file for the API
 *
 */ 


//dependencies
var server = require('./lib/server');

//app container
var app = {}

app.init = function(){
    //start up the server
    server.init();
}

//self executing
app.init();

//export the app
module.exports = app;


