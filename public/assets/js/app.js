console.log("js file connected");

// Grab the articles as a json
$.getJSON("/api/articles", (articles) => {
    // For each one
    articles.forEach((article) => {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + article._id + "'>" + article.title + "<br />" + article.link + "</p>");
        console.log(article);

    });


});