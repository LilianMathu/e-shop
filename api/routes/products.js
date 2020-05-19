const express = require('express');
const router = express.Router();

// Import the database models
const Product = require('../models/Products');


// the routes

// POST route
router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    }); 
    product.save()
    .then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })

    res.status(201).json({
        "message": "successful",
        product
    });
});

//GET route
router.get('/', (req, res) => {
    res.status(200).json({
        "message": "Handling get requests"
    });
});

 
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(product =>{
        console.log(product);
        res.status(200).json(product);
    })
    .catch(error => {
        res.status(500).json({error});
    });
});

//PATCH route
router.patch('/:productId', (req, res) => {
    res.status(200).json({
        "message": "Patch request to /products"
    });
});

// DELETE route
router.delete('/:productId', (req, res) => {
    res.status(200).json({
        "message": "delete requests to /products"
    });
});
module.exports = router;