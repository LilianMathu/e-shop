const express = require('express');
const router = express.Router();

// Import database model
const Order = require('../models/Orders');


// Install routes

// POST routes
router.post('/', (req, res) => {
   const order = new Order({
       productId: req.body.productId,
       quantity: req.body.quantity
   });

   order.save()
       .then(order => {
           res.status(201).json({
               message: "created successfully",
               newOrder: {
                   _id: order._id,
                   productId: order.productId,
                   quantity: order.quantity
               },
               request: {
                   type: 'GET',
                   url: 'http://localhost:5000/orders'
               }
           });
       })
       .catch(error => {
           res.status(200).json({ error });
       });
   
});

// GET routes
router.get('/', (req, res) => {
   
});

router.get('/:orderId', (req, res) => {
    
});

// DELETE routes
router.delete('/:orderId', (req, res) => {
   
});

module.exports = router;