const http = require('http');
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('./contollers/bookController');

const PORT = process.env.PORT || 3000;

const server = http.createServer( (req, res) => {

	if(req.url === '/api/bookInfo' && req.method === 'GET'){
		getBooks(req, res);
	}
	else if(req.url.match(/\/api\/bookInfo\/\d+/) && req.method === 'GET'){
		const id = req.url.split('/')[3];
		getBook(req, res, id);
	}
	else if(req.url === '/api/bookInfo' && req.method === 'POST'){
		createBook(req, res);
	}
	else if(req.url.match(/\/api\/bookInfo\/\d+/) && req.method === 'PUT'){
		const id = req.url.split('/')[3];
		updateBook(req, res, id);
	}
	else if(req.url.match(/\/api\/bookInfo\/\d+/) && req.method === 'DELETE') {
		const id = req.url.split('/')[3];
		deleteBook(req, res, id);
	}
	else {
		res.writeHead( 404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ 'message': 'Route not found' }));
	}

});

server.listen(PORT, () => console.log(`Server started \n\http://127.0.0.1:${PORT}`));
