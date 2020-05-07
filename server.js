const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const port = process.env.PORT || 5000;

const app = express();

// mount the middleware
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));

// Install the routes
app.get('/', (req, res) => {
    res.send('Hello world').status(200);
})

// Set up server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});