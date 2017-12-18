module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", {
      // just using this to test how handlebars works!
      test: `Click the button for the latest articles!`
    });
  });
};
