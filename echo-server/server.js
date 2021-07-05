const http = require('http');
const url = require('url');

let server = new http.Server((req, res) => {
    let urlParsed = url.parse(req.url, true);
    if( urlParsed.pathname === '/echo' && urlParsed.query){
        res.statusCode = 200;
        res.end( JSON.stringify(urlParsed.query) );
    }
    else{
        res.statusCode = 404;
        res.end('Page not found');
    }
}).listen(2000, '127.0.0.1');

