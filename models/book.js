const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers/';

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    noOfPages: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    coverPage: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverPage != null) {
        return path.join('/', coverImageBasePath, this.coverPage)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath