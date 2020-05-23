const express = require('express');
const router = express.Router();
const multer = require('multer');

// Storage of files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {      //func that def where incoming files should be stored
        //callback is executed last. pass a potential error and relative path for storing the files
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {       //func define how files should be named
        //you can choose to give the original or the filename
        cb(null, new Date().toISOString() + file.originalname);
    }
});

//Specify the Mimetype by rejecting or accepting the mimetype
const fileFilter = (req, file, cb) => {
    //Accepting files
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image.png') {
        cb(null, true);
    }else {
        //rejecting a file syntax
        cb(null, false);
    }
};

// Initialize multer
// limit sets the size of the files acceptable in bytes. this case takes 5mb
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilter
}); // upload is not publicly accessible Hence its saved in static files


// Import the database models
const Product = require('../models/Products');


// the routes

// POST route
router.post('/', upload.single('productImage'), (req, res) => {
    console.log(req.file);
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(product => {
            res.status(201).json({
                message: "created successfully",
                newProduct: {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products' + product._id
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
});

//GET route
router.get('/', (req, res) => {
    Product.find()
        .select('_id name price')
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                products: products.map(products => {
                    return {
                        name: products.name,
                        price: products.price,
                        _id: products._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + products._id
                        }
                    }
                })
            };
            res.status(200).json(response);
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
        .select('_id name price')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: "successful",
                    return: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products' + product._id
                        }
                    }
                });
            } else {
                res.status(404).json({ "message": "Product with that id not found" });
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
            res.status(200).json({
                message: "successfully updated",
                return: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products' + product._id
                    }
                }
            });
        })
        .catch(error => {
            console.log({ error });
            res.status(500).json({ error });
        });
});

// DELETE route
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(product => {
            res.status(200).json(product)
        })
        .catch(error => {
            res.status(500).json({ error })
        });
});
module.exports = router;