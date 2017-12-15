const request = require('request');
const cheerio = require("cheerio");
//const mongoose = require("mongoose");

// Require all models
const db = require("../models");



module.exports = (app) => {
    app.get("/api/TEST", (req, res) => {

        res.send(`API ROUTE TEST`);
    });

    // Scrape data from one site and place it into the mongodb db
    app.post("/api/scrape", (req, res) => {
        // Make a request for the news section of ycombinator
        request("https://news.ycombinator.com/", (error, response, html) => {
            // Load the html body from request into cheerio
            const $ = cheerio.load(html);
            // For each element with a "title" class

            $(".title").each(function (i, element) {
                // Save an empty result object
                const result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                //If this found element had both a title and a link
                if (result.title && result.link) {
                    // Create a new Article using the `result` object built from scraping
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // If we were able to successfully scrape and save an Article, send a message to the client

                        }).catch(function (err) {
                            // If an error occurred, send it to the client
                            res.json(err);
                        });

                    console.log(`TITLES: ${result.title}`);
                    console.log(`LINKS: ${result.link}`);
                }
            });
            res.send("Scrape Complete");
            //console.log(`Here is what we grabbed ${JSON.stringify(result)}`);
        });



    });

    app.get("/api/articles", (req, res) => {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then((dbArticle) => {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch((err) => {
                // If an error occurred, send it to the client
                res.json(err);
            });
        console.log("we have the articles from database");
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/api/articles/:id", (req, res) => {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({
                _id: req.params.id
            })
            // ..and populate all of the notes associated with it
            //.populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
        console.log(`We grabbed the individual article for you!`);
    });


    // Route for saving/updating an Article's associated Note
    app.post("/api/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note
            .create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    note: dbNote._id
                }, {
                    new: true
                });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
};