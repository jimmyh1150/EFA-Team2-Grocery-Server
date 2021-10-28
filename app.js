require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');
const middleware = require('./middleware');

app.use(Express.json());
app.use(middleware.headers);

dbConnection.authenticate()
.then(() => {
    dbConnection.sync() // => {force: true} {alter: true}
    console.log(("Database Synced"));
}) 
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log((`[Server]: App is listening on port ${process.env.PORT}`))
    })
})
.catch((err) => {
    console.log((`[Server]: Server Yoted! ${err}`));
})
