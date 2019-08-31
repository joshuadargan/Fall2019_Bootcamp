var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  //Parses the URL and then checks the path if it is '/listings'
  if (parsedUrl.path == '/listings')
  {
    //Send OK response and the listingData
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(JSON.stringify(listingData));
  }
  else
  {
    //Send 404 Error
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("Bad gateway error");
  }
 
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

  //Check for errors
  if (err) throw err;

  //Save the sate in the listingData variable already defined
  listingData = JSON.parse(data);
    
  //Creates the server
  server = http.createServer(requestHandler);
  //Start the server
  server.listen(port);

});


 /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */