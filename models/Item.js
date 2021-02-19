const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: True
    },
    format: {
        type: String
    },
    date: {
        type: Date
    }
    price: {
        type: Number,
        required: True
    },
    availability: {
        type: Boolean,
        required: True
    },
});

module.exports = Item = mongoose.model('item', ItemSchema);

