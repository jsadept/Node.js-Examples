const express = require("express");
 
const app = express();
app.get("/", (request, response) => {
    response.send("<h1>Home page</h1>");
});
app.get("/about", (request, response) => {
    response.send("<h1>About us</h1>");
});
app.get("/contact", (request, response) => {
    response.send("<h1>Contacts</h1>");
});
app.listen(3000);