const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', (req, res) => {
    res.render('authors/index')
})

router.get('/create', (req, res) => {
    res.render('authors/create')
})

router.post('/store', (req, res) => {
    // res.send('Author created successfully.')
    const newAuthor = {
        name: req.body.name,
        email: req.body.email
    }
    const author = new Author(newAuthor);
    author.save().then(result => {
        res.status(200).json({
            message: "Authoor created successfully.",
            authorId: result._id
        })
    }).catch(err => {
        res.status(400).json({
            message: "Author creation failed",
            error: err
        })
    })


})


module.exports = router