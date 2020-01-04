const express = require('express')
const router = express.Router()
const path = require('path')
const fileUpload = require('express-fileupload')



// Models
const Book = require('../models/book')
const Author = require('../models/author')

//Upload Path
const uploadPath = path.join('public', Book.coverImageBasePath)


// default options
router.use(fileUpload());


router.get('/', async(req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title !== '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }

    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }


})

router.get('/create', async(req, res) => {
    // res.render('books/create')
    renderNewPage(res, new Book())

})

router.post('/store', async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.render('books/create', {
            errorMessage: 'No files were uploaded.'
        })
    }

    let coverFile = req.files.coverPage;
    coverPage = Date.now() + '-' + coverFile.name;



    const newBook = {
        title: req.body.title,
        description: req.body.description,
        noOfPages: req.body.noOfPages,
        author: req.body.author,
        coverPage: coverPage,
        publishDate: new Date(req.body.publishDate)
    }



    const book = new Book(newBook);


    try {

        await book.save()
            //Upload file
        await coverFile.mv(path.join(uploadPath, coverPage))
        res.redirect('/book')

    } catch (error) {
        renderNewPage(res, book, true)
    }

})


async function renderNewPage(res, book, hasError = false) {
    try {

        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        }

        if (hasError) params.errorMessage = 'Error in creating book!'

        res.render('books/create', params)
    } catch (error) {
        res.redirect('/book')
    }

}


module.exports = router