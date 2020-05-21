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
   Order.find()
   .select('_id productId quantity')
   .exec()
   .then(order => {
       res.status(200).json({
           count: order.length,
           order: order.map(order => {
               return {
                   _id: order._id,
                    productId: order.productId,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/orders'
                    }
               }
           })
       });
   })
   .catch(error => {
       res.status(500).json({ error });
   });
});

router.get('/:orderId', (req, res) => {
    const id = req.params.id;
    Order.findById(id)
    .select('_id productId quantity')
    .exec()
    .then(order => {
        res.status(200).json({
            ordersReturned: {
                _id: order._id,
                productId: order.productId,
                quantity: order.quantity
            },
            response: {
                type: 'GET',
                url: 'http://localhost:5000/orders' + order._id
            }
        });
    })
    .catch(error=> {
        res.status(500).json({ error });
    })
});

// DELETE routes
router.delete('/:orderId', (req, res) => {
   
});

module.exports = router;