# Library v2 REST API Native Node.js 

> REST API using Node.js 

A simple project to demonstrate how the native Node.js REST API server works without using frameworks.

```
# Structure
server.js 	- for create server
app.js 		- for routing 
utils.js 	- for other utility functions 
./contollers 	- for controllers
./models 	- for models

```

```
# Routes
GET      /api/bookInfo 		- to get all books
POST     /api/bookInfo 		- to add new book
GET      /api/bookInfo/bookID 	- to get book
PUT      /api/bookInfo/bookID 	- to update book
DELETE   /api/bookInfo/bookID 	- to delete book

```

## Usage

```
# Install dependencies
npm install
yarn install

# Run in development
npm run dev
yarn run dev

# Run in production
npm start
yarn start
```
