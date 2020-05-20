const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    productId: { 
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Orders', orderSchema);