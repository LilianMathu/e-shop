const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// import models
const User = require('../models/User');

// Route
router.post('/signup', (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'mail exist'
            });
        } else {
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
        }
    })
});

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
            message: 'user deleted'
        });
    })
    .catch(error => {
        res.status(500).json({ error });
    }); 
})

module.exports = router;