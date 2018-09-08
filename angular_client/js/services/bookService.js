/**
 * Factory.
 * A set of methods related to the "books" collection in the database.
 */
define([], function() {
    function bookService($log, $http) {

        /**
         * Fetches a book document from the databse.
         * 
         * @param {ObjectId}
         * @return {Promise}
         */
        function getBookById(id) {
            $log.log('getBook API call initiated')
            return $http.get('http://localhost:3000/books/' + id)
        }

        /**
         * Fetches an array of all books in the databse.
         * 
         * @return {Promise}
         */
        function getBooks() {
            $log.log('getBooks API call initiated')
            return $http.get('http://localhost:3000/books')
        }

        /**
         * Fetches a count of all books in the database.
         * 
         * @return {Promise}
         */
        function getBookCount() {
            $log.log('getBookCount API call initiated')
            return $http.get('http://localhost:3000/books/count')
        }

        /**
         * Helper method that finds a unit in a book.
         * 
         * @param {ObjectId}
         * @param {Document|Array}
         * @return {Document}
         */
        function getUnitById(unitId, units) {
            var unitToReturn 
            units.forEach((unit) => {
                if (unit._id === unitId) {
                    unitToReturn = unit
                }
            })
            return unitToReturn
        }

        /**
         * Helper method that finds a word in a unit.
         * 
         * @param {ObjectId}
         * @param {Document|Array}
         * @return {Document}
         */
        function getWordById(wordId, words) {
            var wordToReturn
            words.forEach((word) => {
                if (word._id === wordId) {
                    wordToReturn = word
                }
            })
            return wordToReturn
        }

        /**
         * Persists a new book object to the database.
         * 
         * @param {Object}
         * @return {Promise}
         */
        function addBook(bookToAdd) {
            $log.log('addBook API call initiated')
            return $http.post('http://localhost:3000/books', bookToAdd)
        }

        /**
         * Adds a new unit to an existing book in the database.
         * 
         * @param {ObjectId}
         * @param {Object}
         * @return {Promise}
         */
        function addUnit(bookId, unitToAdd) {
            $log.log('addUnit API call initiated')
            return $http.put('http://localhost:3000/books/' + bookId, unitToAdd)
        }

        /**
         * Adds a new word to an existing unit.
         * 
         * @param {ObjectId}
         * @param {ObjectId}
         * @param {Object}
         * @return {Promise}
         */
        function addWord(bookId, unitId, wordToAdd) {
            $log.log('addWord API call initiated')
            return $http.put('http://localhost:3000/books/' + bookId + '/' + unitId, wordToAdd)
        }

        /**
         * Adds a new sentence to an existing unit.
         * 
         * @param {ObjectId} bookId 
         * @param {ObjectId} unitId 
         * @param {Object} sentenceToAdd 
         * @return {Promise}
         */
        function addSentence(bookId, unitId, sentenceToAdd) {
            $log.log('addSentence API called initiated')
            return $http.post('http://localhost:3000/books' + bookId + '/' + unitId, sentenceToAdd)
        }

        return {
            getBookById: getBookById,
            getBooks: getBooks,
            getBookCount: getBookCount,
            getUnit: getUnitById,
            getWord: getWordById,
            addBook: addBook,
            addUnit: addUnit,
            addWord: addWord,
            addSentence: addSentence
        }
    }

    // dependency injection
    bookService.$inject = ['$log', '$http']

    // return service
    return bookService
})
    