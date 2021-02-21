const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    },
    pseudo_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minLength: [8, 'Minimum password length must be 8 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user',UserSchema);