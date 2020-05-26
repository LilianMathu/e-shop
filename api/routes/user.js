const express = require('express');
const router = express.Router;
const mongoose = require('mongoose');

// import models
const userModel = require('../models/User');

// Route
router.post('/signup', (Req, res) => {
    const user = new userModel({
        email: req.body.email,
        password: req.body.password
    });
});