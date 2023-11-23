console.log("Hello World");

const http = require("http");

const server = http.createServer((request, response) => {
  if(request.url === '/'){
    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.end('Welcome to my server!');
  } else if (request.url === '/about'){
    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.end('This is the about page!');
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain'});
    response.end('404 Not Found!');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
