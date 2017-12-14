module.exports = (app) => {
    app.get("/api/TEST", (req, res) => {

        res.send(`API ROUTE TEST`);
    });



};