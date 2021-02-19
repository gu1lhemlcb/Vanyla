const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: String,
    },
    items: [{
        product_id: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number,
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    },
});

module.exports = Cart = mongoose.model('cart', CartSchema);