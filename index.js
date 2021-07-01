/*
 * Primary file for the API
 *
 */ 


//dependencies
var server = require('./lib/server');
var cli = require('./lib/cli')

//app container
var app = {}

app.init = function(){
    //start up the server
    server.init();

    //start the cli tool
    setTimeout(function(){
        cli.init()
    },50);
}

//self executing
app.init();

//export the app
module.exports = app;


