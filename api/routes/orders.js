const express = require('express');
const router = express.Router();

// Install routes

// POST routes
router.post('/', (req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
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