if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const connection = require('./connection')
const indexRoutes = require('./routes/index')
const authorRoutes = require('./routes/authors')
const bookRoutes = require('./routes/books')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.get('/', indexRoutes)
app.use('/author', authorRoutes)
app.use('/book', bookRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('UP and running on port ' + port)
})