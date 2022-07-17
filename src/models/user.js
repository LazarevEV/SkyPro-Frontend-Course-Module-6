const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
    },
    userName: {
        type: String,
        required: false,
        minlength: 5,
    },
});

module.exports = mongoose.model('user', userSchema);