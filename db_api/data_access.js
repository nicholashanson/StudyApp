/**
 * A set of wrapper methods that use mongoose methods
 * to access the database.
 */
var stats = require('/student_stats').stats

/**
 * Fetch all documents in the "students" collection.
 * 
 * @param {Function} callback 
 */
function getStudents(callback) {
    models.Student.find({})
        .exec(
            (err, students) => {          
                if (err) 
                    callback(err, null)                         
                else 
                    callback(null, students)         
            })
}

/**
 * Fetch a single document from the "students" collection
 * 
 * @param {ObjectId} id 
 * @param {Function} callback 
 */
function getStudentById(id, callback) {
    models.Student.findById(id)
            .exec(
                (err, student) => {
                    if (err) 
                        callback(err, null)
                    else 
                        callback(null, student)                        
                })
}

/**
 * Get a count of all documents in the "students" collection.
 * 
 * @param {Function} callback 
 */
function getStudentCount(callback) {
    models.Student.count({})
        .exec(
            (err, count) => {
                if (err) 
                    callback(err, null)
                else 
                    callback(null, count)   
            })    
}

/**
 * Add a new document to the "students" collection
 * 
 * @param {Object} studentToPost 
 * @param {Function} callback 
 */
function postStudent(studentToPost, callback) {
    var studentAlreadyExists = true
    models.Student.findOne({ name: studentToPost.name })
        .exec((err, docs) => {
            if (err) {
                callback(err, null, null)
            } else {
                if (docs) {
                    callback(err, studentAlreadyExists, null)
                }
                else {
                    var studentToAdd = new models.Student({ name: studentToPost.name })
                        
                    console.log('student model instantiated')
      
                    stats.forEach((stat) => {
                        studentToAdd.stats.push({key: stat, value: 0})
                    })
                        
                    studentToAdd.setPassword(studentToPost.password)
                    
                    studentToAdd.save((err, student) => {
                        if (err) 
                            callback(err, null, null)
                        else
                            callback(null, null, student)             
                    })
                }
            }
        })
}

/**
 * Fetch all documents from the "books" collection
 * 
 * @param {Function} callback 
 */
function getBooks(callback) {
    models.Book.find({})
        .exec( 
            (error, books) => {
                if (err) 
                    callback(err, null)                         
                else 
                    callback(null, books)
            })
}

/**
 * Fetch a single document from the "books" collection.
 * 
 * @param {ObjectId} id 
 * @param {Function} callback 
 */
function getBookById(id, callback) {
    models.Book.findById(id)
        .exec(
            (err, book) => {
                if (err) 
                    callback(err, null)
                else 
                    callback(err, book)
            })
}      

/**
 * Add a new document to the "books" collection
 * 
 * @param {Object} bookToPost
 * @param {Function} callback
 */
function postBook(bookToPost, callback) {
    var bookAlreadyExists = true
    models.Book.findOne({ title: bookToPost.title }, (err, docs) => {
        if (err) 
            callback(err, null, null)
        else {
            if (docs) {
                callback(null, bookAlreadyExists, null)
                return
            }
            
            let bookToAdd = new models.Book({ title: bookToPost.title })
                        
            console.log('book model instantiated')      
                        
            bookToAdd.save((err, book) => {
                if (err) 
                    callback(err, null, null)
                else 
                    callback(null, null, book)
            })
        }
    })
}

/**
 * Add a new unit to a book document
 * 
 * @param {Object} unitToAdd 
 * @param {Function} callback 
 */
function addUnit(unitToAdd, callback) {

    var unitAlreadyExists = false

    models.Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) 
            callback(err, null, null)
        else {

            book.units.forEach((unit) => {
                if (unit.name === unitToAdd.name) 
                    unitAlreadyExists = true                
            })               
                        
            if (unitAlreadyExists) {
                callbakc(null, unitAlreadyExists, null)
            } 
                            
            book.units.push({ name: unitToAdd.name })
                        
            book.save((err, book) => {
                if (err) 
                    callback(err, null, null)
                else 
                    callback(null, null, book)
            })                          
        }
    })
}

/**
 * Add a new word to an existing unit
 * 
 * @param {Object} wordToAdd 
 * @param {Function} callback 
 */
function addWord(wordToAdd, callback) {

    models.Book.findOne({ _id: wordToAdd.bookId }, (err, book) => {
        if (err) {
            callback(err, null, null)
        } else {
     
            var unit = book.units.id(wordToAdd.unitId)
                         
            var wordAlreadyExists = false 
                         
            unit.words.forEach((word) => {
                if (word.value === wordToAdd.value)
                    wordAlreadyExists = true                                                                    
            })
                          
            if (wordAlreadyExists) {
                callback(null, wordAlreadyExists, null)
            } 
             
            unit.words.push({ value: wordToAdd.value, imageUrl: wordToAdd.imageUrl })
                         
            book.save((err, book) => {
                if (err) 
                    callback(err, null, null)
                else 
                    callback(null, null, book)
            })
        }
    })
}

function deleteBookById(id, callback) {
    models.Book.remove((err) => {
        if (err) callback(err)
        else callback(null)
    })
}

var data_access = {
    getStudents: getStudents,
    getStudentById: getStudentById,
    getStudentCount: getStudentCount,
    postStudent: postStudent,
    getBooks: getBooks,
    getBookById: getBookById,
    postBook: postBook,
    addUnit: addUnit,
    addWord: addWord
}

module.exports = data_access
