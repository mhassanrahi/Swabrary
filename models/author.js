const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Author', authorSchema);