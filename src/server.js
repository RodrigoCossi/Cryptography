

const http = require('http');
const https = require('https');

const hostname = '127.0.0.1';
const unsecuredPort = 3000;
const securedPort = 443; // standard https port

const fs = require('fs');
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create a new HTTP server using the http.createServer() method
// This method takes a callback function as an argument, which will be called whenever a request is received by the server
const Unsecuredserver = http.createServer((req, res) => {
  // Set the HTTP status code to 200 (OK)
  res.statusCode = 200;
  
  // Set the 'Content-Type' header of the response to 'text/plain'
  res.setHeader('Content-Type', 'text/plain');
  
  // Send the response body with the message 'Hello, World!\n'
  res.end('Hello, World!\n');
});

// The server will begin accepting connections and invoking the callback function provided to createServer() when requests are received
Unsecuredserver.listen(unsecuredPort, hostname, () => {
  // Once the server has started successfully, log a message to the console indicating the server is running
  console.log(`Server running at http://${hostname}:${unsecuredPort}/`);
  console.log("request received");
});



// ---------------------------SSL---------------------------------

const securedServer = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS World!');
});

securedServer.listen(securedPort, () => {
  console.log(`SSL Server listening on port ${securedPort}`);
});

