const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');
let bookInfo = require('../bookInfo.json');



function findAll() {
	return new Promise((resolve, reject) => {
		resolve(bookInfo);
	})
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const book = bookInfo.find((curr) => curr.id === id);
		resolve(book);
	})
}

function create(book) {
	return new Promise((resolve, reject) => {
		const newBook = {id: uuidv4(), ...book};
		bookInfo.push(newBook);
		writeDataToFile('./bookInfo.json', bookInfo);
		resolve(newBook);
	})
}

function update(id, book) {
	return new Promise((resolve, reject) => {
		const index = bookInfo.findIndex((current) => current.id === id);
		bookInfo[index] = { id, ...book }

		writeDataToFile('./bookInfo.json', bookInfo);
		resolve(bookInfo[index]);

	})
}

function deleteById(id) {
	return new Promise((resolve, reject) => {
		bookInfo = bookInfo.filter((current) => current.id !== id);
		writeDataToFile('./bookInfo.json', bookInfo);
		resolve(`Book deleted`);
	})
}
module.exports = { findAll, findById, create, update, deleteById }
