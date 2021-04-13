const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
        required: true
    },
    format: {
        type: String
    },
    date: {
        type: Date
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
});

module.exports = Item = mongoose.model('item', ItemSchema);

