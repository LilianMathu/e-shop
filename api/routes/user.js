const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import models
const User = require('../models/User');

// Route
router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'mail exist'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                   return res.status(500).json({ 
                    message: "bcrypt errors",   
                    err 
                });
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
        
                    user.save()
                    .then(user => {
                        console.log(user);
                        res.status(201).json({
                            message: "User created",
                            user
                        });
                    })
                    .catch(error => {
                        res.status(500).json({ 
                            message: "save failed",
                            error 
                        });
                    });
                }
            });
        }
    })
    .catch(error => {
        res.status(500).json({ 
            message: "route failed",
            error 
        });
    });
});

// Login route
router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "auth failed"
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            // the err is not as a result of wrong password but an error in the comparison process
            if(err) {
                res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result) {
                const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token
                });
            }

            // In case of a wrong password or email address, this code is run
            res.status(401).json({
                message: "Incorrect password"
            });
        });
    })
    .catch(error => {
        res.status(500).json({ 
            message: "failed",
            error 
        });
    });
})


// GET route
router.get('/', (req, res)=> {
    User.find()
    .select('_id email')
    .exec()
    .then(users => {
        const response = {
            count: users.length,
            users: users.map(users => {
                return {
                    _id: users._id,
                    email: users.email
                };
            })
        };
        res.status(200).json({ response     });
    })
    .catch(error => {
        res.status(500).json({ error });
    });
})


// Delete route
router.delete('/:userId', (req, res) => {
    const id = req.params.userId;
    User.deleteOne({_id: id})
    .exec()
    .then(user => {
        res.status(200).json({
            message: 'user deleted',
            user
        });
    })
    .catch(error => {
        res.status(500).json({ error });
    }); 
})

module.exports = router;