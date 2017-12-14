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
                // Save the text and href of each link enclosed in the current element
                var title = $(element).children("a").text();
                var link = $(element).children("a").attr("href");

                //If this found element had both a title and a link
                if (title && link) {
                    // Insert the data in the scrapedData db
                    db.Article.insert({
                            title: title,
                            link: link
                        },
                        function (err, inserted) {
                            if (err) {
                                // Log the error if one is encountered during the query
                                console.log(err);
                            } else {
                                // Otherwise, log the inserted data
                                console.log(inserted);
                            }
                        });

                    console.log(`TITLES: ${title}`);
                    console.log(`LINKS: ${link}`);


                    }

                res.end(); //added this to end the response cycling.

            });
        });



    });
};