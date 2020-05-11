const express =require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

// mount the middleware
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));


// Import routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Install the routes as middleware. The second argument is a handler
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


module.exports = app;