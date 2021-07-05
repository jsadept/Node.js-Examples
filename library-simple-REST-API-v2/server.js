const http = require('http');
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('./contollers/bookController');
const { routes, router } = require('./app');

const PORT = process.env.PORT || 3000;


const server = http.createServer((request, response) => {
	router({ request, response });
});


server.listen(PORT, () => console.log(`Server started \n\http://127.0.0.1:${PORT}`));
