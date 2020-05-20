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
    .then(product => {
        console.log(product);
        res.status(201).json(product);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
});

//GET route
router.get('/', (req, res) => {
    Product.find()
        .exec()
        .then(products => {
            console.log(products);
            res.status(200).json(products);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })
        });
});

// GET by id
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json(product);
                console.log(product);
            } else {
                res.status(404).json({ "message": "Product with that id not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

//PATCH route
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(product => {
            console.log(product);
            res.status(200).json(product);
        })
        .catch(error => {
            console.log({ error });
            res.status(500).json({ error });
        });
});

// DELETE route
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(product => {
        res.status(200).json(product)
    })
    .catch(error => {
        res.status(500).json({ error })
    });
});
module.exports = router;