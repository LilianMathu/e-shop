const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// import models
const User = require('../models/User');

// Route
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
           return res.status(500).json({ err });
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
                res.status(500).json({ error });
            });
        }
    });

});

module.exports = router;