const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import database model
const Orders = require('../models/Orders');


// Install routes

// POST routes
router.post('/', (req, res) => {
    const order = new Order ({
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save(orders => {
        console.log(orders);
    }).catch(error => {
        console.log(error);
    });

    res.status(201).json({
        "message": "post requests to /order",
        order
    });
});

// GET routes
router.get('/', (req, res) => {
    res.status(200).json({
        "message": "handling get requests to /orders"
    });
});

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;

    res.status(200).json({
        "message": "Successful",
        id
    });
});

// DELETE routes
router.delete('/:orderId', (req, res) => {
    res.status(200).json({
        "message": "deleted order"
    });
});

module.exports = router;