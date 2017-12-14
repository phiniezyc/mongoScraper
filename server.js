const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require ("express-handlebars");


// Our scraping tools

// It works on the client and on the server
var request = require('request');
const cheerio = require("cheerio");

// Require all models
//const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));



// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");



// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraper", {
    useMongoClient: true
});



// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});