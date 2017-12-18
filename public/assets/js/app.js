// Grab the articles as a json
$.getJSON("/api/articles", (data) => {
    // For each one
    data.forEach((article) => {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + article._id + "'>" + article.title + "<br />" + article.link + "</p>");
        
    });
});

$(document).on("click", "p", function () { //setting to annonymous ES5 returns the correct "this"...

    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    const thisId = $(this).attr("data-id");
    console.log(this);

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
            $("#notes").append("<h5>" + data.title + "</h5>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' placeholder='Enter Note Title Here:'>");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Enter Note Text Here:'></texta" +
                    "rea>");
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

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/api/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
    // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});