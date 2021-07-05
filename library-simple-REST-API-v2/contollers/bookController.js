const Book = require('../models/bookModel');

const { getData } = require('../utils');

// @desc Gets all books
// @route GET /api/bookInfo/
async function getBooks(req, res) {
	try{
		const bookInfo = await Book.findAll();
		res.writeHead( 200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(bookInfo));
	}
	catch(error){
		console.log(error);
	}

}

// @desc Gets single book
// @route GET /api/bookInfo/:id
async function getBook(req, res, id) {
	try{
		const book = await Book.findById(id);
		if(!book){
			res.writeHead( 400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ 'message': 'Book not found'}));
		} else{
			res.writeHead( 200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(book));
		}
	}
	catch(error){
		console.log(error);
	}

}

// @desc Create single book
// @route POST /api/bookInfo
async function createBook(req, res) {
	try{
		const content = await getData(req);

		const { title, status, authors, categories } = JSON.parse(content);

		const bookData = {
			title,
			status,
			authors,
			categories,
		}

		const newBook = await Book.create(bookData);

		res.writeHead( 201, { 'Content-Type': 'application/json' });
		return res.end(JSON.stringify(newBook));
	}
	catch(error){
		console.log(error);
	}

}
// @desc Update single book
// @route PUT /api/bookInfo/:id
async function updateBook(req, res, id) {
	try{
		const book = await Book.findById(id);
		if(!book){
			res.writeHead( 400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ 'message': 'Book not found'}));
		} else{
			const content = await getData(req);

			const { title, status, authors, categories } = JSON.parse(content);

			const bookData = {
				title: title || book.title,
				status: status || book.status,
				authors: authors || book.authors,
				categories: categories || book.categories,
			}

			const updatedBook = await Book.update(id, bookData);

			res.writeHead( 200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(updatedBook));
		}
	}
	catch(error){
		console.log(error);
	}
}
// @desc Delete single book
// @route DELETE /api/bookInfo/:id
async function deleteBook(req, res, id) {
	try{
		const book = await Book.findById(id);

		if(!book){
			res.writeHead( 400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ 'message': 'Book not found'}));
		} else{
			const deletedBook = await Book.deleteById(id);

			res.writeHead( 200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ 'message': 'Book deleted'}));
		}
	}
	catch(error){
		console.log(error);
	}
}
module.exports = { getBooks, getBook, createBook, updateBook, deleteBook }
