var request = require('request');
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// Require all models
var db = require("../models");



module.exports = (app) => {
    app.get("/api/TEST", (req, res) => {

        res.send(`API ROUTE TEST`);
    });

    // Scrape data from one site and place it into the mongodb db
    app.get("/scrape", function (req, res) {
        // Make a request for the news section of ycombinator
        request("https://news.ycombinator.com/", function (error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            // For each element with a "title" class
            $(".title").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");


                //If this found element had both a title and a link
                if (result.title && result.link) {
                    // Create a new Article using the `result` object built from scraping
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // If we were able to successfully scrape and save an Article, send a message to the client
                            res.send("Scrape Complete");
                        }).catch(function (err) {
                            // If an error occurred, send it to the client
                            res.json(err);
                        });

                    console.log(`TITLES: ${result.title}`);
                    console.log(`LINKS: ${result.link}`);
                }

                res.end(); //added this to end the response cycling.

            });
        });



    });
};