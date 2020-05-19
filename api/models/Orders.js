const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    productId: Number,
    quantity: Number
});

module.exports = mongoose.model('Orders', orderSchema);