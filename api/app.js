const express = require('express');
const db = require('./config.js');
const bodyParser = require('body-parser');

const app = express();
const port = 5432;

// Middleware
app.use(bodyParser.json());

// Routes

//connect to DB
db.connect((error) => {
    if (error) return console.log(error);
    console.log("Connect to DB success");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});