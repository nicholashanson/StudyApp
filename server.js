console.log('Starting...')

// load environment variables
require('dotenv').load()

var passport = require('passport')
var express = require('express')
var bodyParser = require('body-parser') 

// allow corss-origin resource sharing
var cors = require('cors')

var app = express()

require('./db_api/passport_config')
app.use(passport.initialize())

var studentsRouter = require('./db_api/routers').studentsRouter
var booksRouter = require('./db_api/routers').booksRouter

app.use(bodyParser.json())

var testJSON = { status: 'ok' }

app.use(cors())

app.all('/', (req, res) => {
    res.json(testJSON)
})        

app.use('/students', studentsRouter)
app.use('/books', booksRouter)

app.listen(3000, () => {})