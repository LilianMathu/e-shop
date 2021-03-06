const express =require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = require('./api/keys').mongodbURI;

const app = express();

// mount the middleware
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use('/uploads', express.static('uploads'));

// Import routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// Setup database
mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected successfully');
    }).catch(error => {
        console.log(error);
    });

// Install the routes as middleware. The second argument is a handler
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);


module.exports = app;