// Grab the articles as a json
$.getJSON("/api/articles", (articles) => {
    // For each one
    articles.forEach((article) => {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + article._id + "'>" + article.title + "<br />" + article.link + "</p>");
        //console.log(article._id);

    });
});

$(document).on("click", "p", () => {
    console.log("p clicked!");

    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    const thisId = $(this).attr("data-id");

    console.log(`this is the id test ${thisId}`); //Currently not undefined for id 

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/api/articles/" + thisId
        })
        // With that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });


});