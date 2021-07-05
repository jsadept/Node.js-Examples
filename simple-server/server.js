const http = require('http');

http.createServer((request, response) => {
        if(error){
            	response.statusCode = 404;
            	response.end("Resourse not found!");
        }   
        else{
            	response.statusCode = 200;
		response.setHeader('Content-Type', 'text/plain');
  		response.end('Hello World\n');
        }
}).listen(3000);