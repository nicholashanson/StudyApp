var express = require('express')

var studentsRouter = express.Router()
var booksRouter = express.Router()

const jwt = require('express-jwt')
const auth = jwt({
    secret: 'jumanji',
    userProperty: 'payload'
})

const requestHandlers = require('./requestHandlers')

studentsRouter
    .get('/', requestHandlers.getStudentsHandler)
    .get('/count', requestHandlers.getStudentCountHandler) 
    .put('/:id', requestHandlers.studentStatsHandler)
    .get('/:id', requestHandlers.getStudentByIdHandler)
    .post('/', requestHandlers.postStudentHandler)
    .post('/login', requestHandlers.logInStudentHandler) 
    .delete('/:id', requestHandlers.deleteStudentHandler)

booksRouter
    .get('/', requestHandlers.getBooksHandler)
    .get('/count', requestHandlers.getBookCountHandler)
    .put('/:bookId/:unitId', requestHandlers.addWordHandler)
    .put('/:id', requestHandlers.addUnitHandler) 
    .get('/:id', requestHandlers.getBookByIdHanddler)
    .post('/', requestHandlers.postBookHandler)
    .delete('/:id', requestHandlers.deleteBookHandler) 
    
const routers = {
    studentsRouter: studentsRouter,
    booksRouter: booksRouter
}

module.exports = routers 
