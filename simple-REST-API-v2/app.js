const { getBooks, getBook, createBook, updateBook, deleteBook } = require('./contollers/bookController');

const routes = {
    '404': (client) => {
        client.response.writeHead( 404, { 'Content-Type': 'application/json' });
        client.response.end(JSON.stringify({ 'message': 'Route not found' }));
    },
    'api\/bookInfo\/[0-9]+':  (client) => {
        const id = client.request.url.split('/')[3];
        if(client.request.method === 'GET'){
            getBook(client.request, client.response, id);
        }
        else if(client.request.method === 'PUT'){
            updateBook(client.request, client.response, id);
        }
        else if(client.request.method === 'DELETE'){
            deleteBook(client.request, client.response, id);
        }
        else{
            client.response.response.writeHead( 404, { 'Content-Type': 'application/json' });
            client.response.end(JSON.stringify({ 'message': 'Method not found' }));
        }
    },
    'api\/bookInfo': (client) => {
        if(client.request.method === 'GET'){
            getBooks(client.request, client.response);
        }
        else if(client.request.method === 'POST'){
            createBook(client.request, client.response);
        }
        else{
            client.response.writeHead( 404, { 'Content-Type': 'application/json' });
            client.response.end(JSON.stringify({ 'message': 'Method not found' }));
        }
    },
}

const router = (client) => {
    let route = routes[client.request.url];
    if(!route){
        for (let key in routes) {
            if(client.request.url.match(key)) {
                route = routes[key];
                break;
            }
            else{
                route = routes['404'];
            }
        }
    }
    route(client);
}

module.exports = {
    routes, router
}
