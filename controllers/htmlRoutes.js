module.exports = (app) => {
    app.get("/", (req, res) => {

        res.send(`HTML ROUTE TEST`);
    });



};