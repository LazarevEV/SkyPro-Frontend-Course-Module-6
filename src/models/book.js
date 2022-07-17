const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    author: {
        type: String,
        required: true,
        minlength: 2,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('book', bookSchema);