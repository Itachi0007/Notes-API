const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse url encoded objects through middleware
app.use(bodyParser.urlencoded( {extended: true} ));
// parse json objects
app.use(bodyParser.json());

// configuring the database
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

// connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {console.log("Successfully connected to the database...")} )
    .catch( err => {console.log("Error : couldn't connect to database", err)} );



app.get('/', (req,res) => {
    res.send("Welcome to the Notes app");
});

// importing the routes
require('./app/routes/note.routes.js')(app);

// select the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at ${port}...`);
});