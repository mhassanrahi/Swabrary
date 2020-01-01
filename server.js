if (process.env.NODE_MODULES !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');


const indexRoutes = require('./routes/index')
    // const connection = require('./connection')
const uri = process.env.DATABASE_URL;
const config = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, config)

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to DB.'))

mongoose.set('useFindAndModify', false);

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