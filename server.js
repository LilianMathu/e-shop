const app = require('./app');
const bodyParser = require('body-parser');
const logger = require('morgan');
const port = process.env.PORT || 5000;


// mount the middleware
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));


// Set up server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});