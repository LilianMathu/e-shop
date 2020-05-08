const express = require('express');
const router = express.Router();

// the routes

// POST route
router.post('/', (req, res) => {
    res.status(201).json({
        "message": "Handling post requests"
    });
})

//GET route
router.get('/', (req, res) => {
    res.status(200).json({
        "message": "Handling get requests"
    });
})

 
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    if(id == 123) {
        res.status(200).json({
            "message": "you got it"
        });
    } else {
        res.status(400).json({
            "message": "object not found"
        });
    }
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