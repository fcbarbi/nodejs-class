/* 
index.js - primary file for the NodeJs Hello API 
Training provided by https://pirple.thinkific.com/ 
fcbarbi@gmail.com - Sep 17, 2018 
Use:
http://localhost:2222/hello
http://localhost:2222/hello?lang=en
http://localhost:2222/hello?lang=de
*/

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

// server responde to requests
var server = http.createServer(function(req,resp){

  // parse the url 
  var parsedUrl = url.parse(req.url,true);  

  // get the path and method 
  var path = parsedUrl.pathname;
  // console.log('path = ',path);  // /sample
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');  
  // console.log('trimmedPath = ',trimmedPath);  // sample

  var queryStrings = parsedUrl.query;

  var method = req.method.toLowerCase();

  var headers = req.headers;

  // payload, if any 
  // https://nodejs.org/api/string_decoder.html
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  
  req.on('data',function(data){       // the req object emits a data event that
      buffer += decoder.write(data);  // we capture to decode and append to buffer 
  });
  
  req.on('end',function(){
    buffer += decoder.end();
 
    // choose the handler for this request 
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct data object tos end to handler 
    var data = {
        'trimmedPath' : trimmedPath,
        'queryStrings' : queryStrings,
        'method' : method,
        'headers' : headers,
        'payload' : buffer
    };

    // route request 
    chosenHandler(data, function(statusCode,payload){
        // use the statusCode valled back by the handler or default to 200 
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        // use the payload valled back by the handler or default to empty object
        payload = typeof(payload) == 'object' ? payload : {};
        // convert payload to string 
        var payloadString = JSON.stringify(payload);
        // return response 
        resp.setHeader('Content-Type','application/json');
        resp.writeHead(statusCode);  
        resp.end(payloadString);
        // log response 
        console.log('returning this response = ',statusCode,payloadString);
    });

   // log the path requested 
   //console.log("path = >"+trimmedPath+'< with method = '+method)
   // https://nodejs.org/api/querystring.html
   console.log('request parameters = ', queryStrings);
   // console.log('lang parameters = ', queryStrings['lang']);

   //console.log("request received with payload = ",buffer);
      
  }); // req.on('end'...

});

// start server on port 3000 or as defined in config.js
server.listen( config.httpPort,function() {
    console.log("server is listening on port "+config.httpPort+" in "+config.envName+" mode");
});

// define handlers 
var handlers = {};
handlers.hello = function(data,callback){
  // callback an HTTP status code and a payload object 
  // console.log('hello with lang = ', data.queryStrings['lang']);
  var language = typeof( data.queryStrings['lang'] ) == 'string' ? data.queryStrings['lang'] : 'en';
  if (language == 'de'){
    callback( 200, { 'Mitteilung':'Hallo aus Zug, Schweiz !' } );
  } else { 
    callback( 200, { 'Message':'Hello from Zug, Switzerland !' } );
  } 
  // callback( 200 );
};
handlers.notFound =  function(data,callback){
  callback( 404 );
};
// define a router
var router = {
    'hello': handlers.hello
}