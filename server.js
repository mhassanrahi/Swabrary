if (process.env.NODE_MODULES !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRoutes = require('./routes/index')
const connection = require('./connection')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))




app.get('/', indexRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('UP and running on port ' + port)
})