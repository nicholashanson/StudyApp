/**
 * Controller.
 * View a word in the unit.
 * Navigate left to right to view other words in the unit.
 */
define([], function() {
    function viewWordCtrl($log, $scope, $location, BookService, StudentService, AuthService) {

        $log.log('viewWordCtrl loaded')

        // Get ids from query string.
        var bookId = $location.search().b
        var unitId = $location.search().u
        var wordId = $location.search().w
            
        BookService.getBookById(bookId)
            .then(
                (response) => {
                    $scope.book = response.data.book

                    $scope.unit = BookService.getUnitById(unitId,$scope.book.units)

                    $scope.words = $scope.unit.words

                    $scope.word = BookService.getWordById(wordId,$scope.words) 

                    /**
                     * Bounds check the word in case the "Next" or "Previous"
                     * buttons need to be disabled.
                     */
                    boundsCheck($scope.word,$scope.words)
                },
                (error) => ($log.log(error))
            )

        // Increment totalWordsViewed in the database.
        if (AuthService.isAuthed())
            StudentService.logView(AuthService.currentStudent()._id, ['totalWordsViewed'])

        /**
         * Helper function for finding a word in the unit.
         * 
         * @param {Document} wordToIndex 
         * @param {Document|Array} words 
         * @return {Number}
         */
        function getWordIndex(wordToIndex, words) {
            var indexToReturn
            words.forEach((word, index) => {
                if (word._id === wordToIndex._id)
                    indexToReturn = index
            })
            return indexToReturn
        }
        
        /**
         * Bounds check the word.
         * $scope.isFirstWord and $scope.isLastWord are used to disable
         * the "Previous" and "Next" buttons respectively.
         * 
         * @param {Document} wordToBoundsCheck 
         * @param {Document|Array} words 
         */
        function boundsCheck(wordToBoundsCheck, words) {
            var index = getWordIndex(wordToBoundsCheck, words)
            if (index === 0) $scope.isFirstWord = true
            if (index === words.length - 1) $scope.isLastWord = true
        }
             
        /**
         * Click event handler for "Next" button.
         * Reloads the page with next word in unit.
         */
        $scope.nextWord = function() {
            var nextWordIndex = getWordIndex($scope.word) + 1
            var nextWordId = $scope.wordswords[nextWordIndex]._id
            $location.path('/view-word').search({ b: bookId,
                u: unitId, w: nextWordId })
        }          

        /**
         * Click event handler for "Previous" button.
         * Reloads the page with previous word in unit.
         */ 
        $scope.previousWord = function() {
            var previousWordIndex = getWordIndex($scope.word) - 1
            var previousWordId = $scope.words[previousWordIndex]._id
            $location.path('/view-word').search({ b: bookId,
                u: unitId, w: previousWordId })
        }
        
    }
    
    // dependency injection
    viewWordCtrl.$inject = ['$log', '$scope', '$location', 'BookService', 'StudentService', 'AuthService']

    // return controller
    return viewWordCtrl
})

                  