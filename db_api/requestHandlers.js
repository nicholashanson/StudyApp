/**
 * Request handlers
 */
var passport = require('passport')
var sendJsonResponse = require('../helpers').sendJsonResponse
var studentStatsCallbacks = require('./student_stats').callbacks

// mongoose models
var models = require('./models')

// wrapped mongoose methods
var data_access = require('./data_access')

/**
 * Fetch all documents from the "students" collection
 */
function getStudentsHandler(req, res) {
    data_access.getStudents(function(err, students){
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, students)        
    })
}               

/**
 * Fetch a single document from the "students" collection.
 */
function getStudentByIdHandler(req, res) {
    var id = req.params.id
    data_access.getStudentById(id, function(err, student){
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, student)
    })
}

/**
 * Get a count of all documents in the "students" collection.
 */
function getStudentCountHandler(req, res) {
    data_access.getStudentCount(function(err, studentCount){
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, studentCount)
    })
}
            
/**
 * Add a new document to the "students" collection
 */
function postStudentHandler(req, res) {
    if (!req.body.name || !req.body.password) {
        sendJsonResponse(res, 400, { required_fields_missing: true })
        return
    }
    var studentToPost = {
        name: req.body.name,
        password: req.body.password
    }
    data_access.postStudent(studentToPost, function(error, studentAlreadyExists, student) {
        if (error) sendJsonResponse(res, 404, err)
        else if (studentAlreadyExists) sendJsonResponse(res, 200, studentAlreadyExists)
        else sendJsonResponse(res, 201, student)
    })
}

/**
 * Authenticate student.
 */
function logInStudentHandler(req, res) {
    if (!req.body.name || !req.body.password) {
        sendJsonResponse(res, 400, { required_fields_missing: true })
        return
    }
    passport.authenticate('local', (err, student, info) => {
        var token 
        if (err) {
            sendJsonResponse(res, 404, err)
            return
        }
        if (student) {
            token = student.generateJwt()
            sendJsonResponse(res, 200, token)
        } else 
            sendJsonResponse(res, 401, info)
    })(req, res)
}  

/**
 * Update a stat in a student document.
 */
function studentStatsHandler(req, res) {
    var key = Object.keys(req.body)[0]
    studentStatsCallbacks[key](req, res)
}

/**
 * Delete a document from the "students" collection.
 */
function deleteStudentByIdHandler(req,res) {
    var id = req.params.id
    data_access.deleteStudentById(id, function(err) {
        if (err) sendJSONResponse(res, 404, err)
        else sendJSONResponse(res, 200, {student_deleted: true})
    })
}    

function getBooksHandler(req,res) {
    data_access.getBooks(function(err, books) {
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, books)
    })
}

/**
 * Fetch a single document from the "students" collection
 */
function getBookByIdHanddler(req,res) {
    var id = req.params.id
    data_access.getBookById(id, function(err,book) {
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, book)
    })
}

/**
 * Get a count of all documents in the "books" collection
 */
function getBookCountHandler(req, res) {
    data_access.getBookCount(function(err, count) {
        if (err) sendJsonResponse(res, 404, err)
        else sendJsonResponse(res, 200, count)   
    })
}
    
/**
 * Add a new document to the "books" collection
 */
function postBookHandler(req, res) {
    if (!req.body.title) {
        sendJsonResponse(res, 400, { required_fields_missing: true })
        return
    }
    var bookToPost = {
        title: req.body.title
    }
    data_access.postBook(bookToPost, function(err, book) {
        if (err) sendJsonResponse(res, 404, error)
        else if (bookAlreadyExists) sendJsonResponse(res, 200, bookAlreadyExists)
        else sendJsonResponse(res, 201, book)
    })
}

/**
 * Add a new unit to an existing book.
 */
function addUnitHandler(req, res) {
    if (!req.body.name) {
        sendJsonResponse(res, 400, { required_fields_missing: true })
        return
    }
    var unitToAdd = {
        id: req.params.id
    }
    data_access.addUnit(unitToAdd, function(err, unitAlreadyExists, book) {
        if (err) sendJsonResponse(res, 404, err)
        else if (unitAlreadyExists) sendJsonResponse(res, 200, unitAlreadyExists)
        else sendJsonResponse(res, 201, unit)
    })
}

/**
 * Add a new word to an existing unit.
 */
function addWordHandler(req, res) {
    if (!req.body.value || !req.body.imageUrl) {
        sendJsonResponse(res, 400, { required_fields_missing: true })
        return
    }    
    data_access.addWord(wordToAdd, function(err, wordAlreadyExists, word) {
        if (err) sendJsonResponse(res, 404, err)
        else if (wordAlreadyExists) sendJsonResponse(res, 200, wordAlreadyExists)
        else sendJsonResponse(res, 201, word)
    })                
}
     
/**
 * Remove a document from the "books" collection.
 */
function deleteBookByIdHandler(req,res) {
    var id = req.params.id
    data_access.deleteBookById(id, function(err) {
        if (err) sendJSONResponse(res, 404, err)
        else sendJSONResponse(res, 200, {book_deleted: true})
    })
}    

const requestHandlers = {
    getStudentsHandler: getStudentsHandler,
    getStudentByIdHandler: getStudentByIdHandler,
    getStudentCountHandler: getStudentCountHandler,  
    postStudentHandler: postStudentHandler,
    logInStudentHandler: logInStudentHandler,
    studentStatsHandler: studentStatsHandler,
    deleteStudentHandler: deleteStudentHandler,
    getBooksHandler: getBooksHandler,
    getBookByIdHanddler: getBookByIdHanddler,
    getBookCountHandler: getBookCountHandler, 
    postBookHandler: postBookHandler,
    addUnitHandler: addUnitHandler,
    addWordHandler: addWordHandler,
    deleteBookByIdHandler: deleteBookByIdHandler          
}

module.exports = requestHandlers
