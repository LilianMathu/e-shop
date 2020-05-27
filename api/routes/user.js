const express = require('express');
const router = express.Router;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// import models
const User = require('../models/User');

// Route
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.email, 10, (err, hash) => {
        if(err) {
            res.status(500).json({ err });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });

            user.save()
            .then(user => {
                res.status(201).json({
                    message: "User created",
                    user
                });
            })
            .catch(error => {
                res.status(500).json({ error });
            })
        }
    })

});