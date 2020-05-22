const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import database models
const Order = require('../models/Orders');
const Products = require('../models/Products');

// Install routes

// POST routes
router.post('/', (req, res) => {
    Products.findById(req.body.productId)
    .then(product => {
        if(!product.productId) {
            return res.status(404).json({
                message: 'product not found'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        });
    
       return order
       .save()
       .then(order => {
           res.status(201).json({
               message: "created successfully",
               order: {
                   _id: order._id,
                   product: order.product,
                   quantity: order.quantity
               },
               request: {
                   type: 'GET',
                   url: 'http://localhost:5000/orders' + order._id
               }
           });
       })
       .catch(error => {
           res.status(200).json({ 
               message: 'Product with that id not found',
               error 
            });
       });
    })
    .catch(error => {
        res.status(500).json({ 
            message: 'Product with that id not found',
            error 
        });
    });

});

// GET routes
router.get('/', (req, res) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name price')
        .exec()
        .then(order => {
            res.status(200).json({
                count: order.length,
                order: order.map(order => {
                    return {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/orders' + order._id
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
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity')
        .populate('product', 'name price')
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json({
                    order: {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity
                    },
                    response: {
                        type: 'GET',
                        url: 'http://localhost:5000/orders' + order._id
                    }
                });
            } else {
                res.status(404).json({ "message": "Order with that id not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// DELETE routes
router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;
    Order.remove({_id: id})
    .exec()
    .then(order => {
        res.status(200).json({
            message: "deleted successfully",
            order
        });
    })
    .catch(error => {
        res.status(500).json({ error });
    });
});

module.exports = router;