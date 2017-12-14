var request = require('request');
const cheerio = require("cheerio");

module.exports = (app) => {
    app.get("/api/TEST", (req, res) => {

        res.send(`API ROUTE TEST`);
    });

    // A GET route for scraping the echojs website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with request
        request("https://news.ycombinator.com/", function (error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);


            // Now, we grab every h2 within an article tag, and do the following:
            $("article h2").each(function (i, element) {
                // Save an empty result object
                var result = {};


                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                // If this found element had both a title and a link
                if (title && link) {
                    // Insert the data in the scrapedData db
                    db.scrapedData.insert({
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
                    
                }
            });
        });
    });



};