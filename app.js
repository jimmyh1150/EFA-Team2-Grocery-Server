require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers'));

const controllers = require("./controllers")

app.use(Express.json());

app.use('/user', controllers.userController);

app.use('/grocerylist', controllers.groceryListController);

app.use('/mylist', controllers.myListController);

dbConnection.authenticate()
.then(() => dbConnection.sync()) 
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log((`[Server]: App is listening on port ${process.env.PORT}`))
    })
})
.catch((err) => {
    console.log((`[Server]: Server Yoted! ${err}`));
});