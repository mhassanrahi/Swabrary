const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', async(req, res) => {
    // res.render('authors/index')
    let searchOptions = {}

    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }


    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        }, )
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/create', (req, res) => {
    res.render('authors/create')
})

router.post('/store', async(req, res) => {
    // res.send('Author created successfully.')
    const newAuthor = {
        name: req.body.name,
        email: req.body.email
    }
    const author = new Author(newAuthor);

    try {
        await author.save();
        res.redirect('/author')

    } catch (error) {
        res.render('authors/create', {
            errorMessage: 'Error creating author.'
        })
    }

})


module.exports = router