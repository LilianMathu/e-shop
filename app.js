const express =require('express');

const app = express();

// Import routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Install the routes as middleware. The second argument is a handler
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


module.exports = app;