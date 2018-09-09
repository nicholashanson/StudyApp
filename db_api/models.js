/**
 * Create database models using mongoose.
 */
var dbURI = 'mongodb://127.0.0.1:27017/test'
var dbOptions = {
    useNewUrlParser: true
}

var mongoose = require('mongoose')
var Schema = require('mongoose').Schema

/**
 * Reuqire methods for password hashing
 * and JSON web token
 */
var auth = require('./auth')

/**
 * Connect to the database
 */
mongoose.connect(dbURI, dbOptions).then(
    () => { 
        console.log('Mongoose connected successfully')
        console.log('Server now listening for requests...')
    },
    err => { throw new Error('Mongoose failed to connect') }
)

// Declare schemas
var wordSchema = Schema({
    value: String,
    imageUrl: String
})

var sentenceSchema = Schema({
    value: String,
    words: [String]
})

var unitSchema = Schema({
    name: String,
    words: [wordSchema],
    sentences: [sentenceSchema]
})
        
var bookSchema = Schema({
    title: String,
    units: [unitSchema]
})

var studentSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    booksStudied: [String],
    hash: String,
    salt: String,
    stats: [
        {
            key: String,
            value: Number
        }
    ]
})

// register authentication methods to the student schema
studentSchema.methods.setPassword = auth.setPassword
studentSchema.methods.validPassword = auth.validPassword
studentSchema.methods.generateJwt = auth.generateJwt

var teacherSchema = Schema({
    name: String
})

// Create models
var Book = mongoose.model('Book', bookSchema)
var Student = mongoose.model('Student', studentSchema)
var Teacher = mongoose.model('Teacher', teacherSchema)

var models = {   
    Book: Book,
    Student: Student,
    Teacher: Teacher
}

module.exports = models
