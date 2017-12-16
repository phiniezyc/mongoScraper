console.log("js file connected");

// Grab the articles as a json
$.getJSON("/api/articles", function (data) {
    // For each one
    data.forEach((data) => {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data._id + "'>" + data.title + "<br />" + data.link + "</p>");
        console.log(data);

    });


});