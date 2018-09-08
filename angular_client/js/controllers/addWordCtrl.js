/**
 * Controller.
 * Adds a new word to an existing unit.
 */

define([], function(){
    function addWordCtrl($scope, $location, BookService) {

        // Get ids from query string
        var bookId = $location.search().b
        var unitId = $location.search().u
        
        // Used to display error message
        $scope.wordAlreadyExists = false

        // Fetch book from the id
        BookService.getBookById(bookId)
            .then(
                (response) => {
                    $scope.units = response.data.book.units

                    /**
                     * If the query string contains a unitId, 
                     * use this as the default option in the selector.
                     * If not, use the first unit in the book.
                     */
                    $scope.selectUnit = unitId
                        ? BookService.getUnitById(unitId,$scope.units)
                        : $scope.units[0]
                }
            )

        /**
         * Click event handler for the "Add Word" button.
         * Displays error message if word already exists.
         * Redirects to '/view-unit?b=bookId&u=unitId if 
         * the word was added successfully.
         */
        $scope.addWord = function() {
            BooksService.addWord(bookId, $scope.selectUnit._id, $scope.wordToAdd)
                .then((response) => {
                    if (response.data.word_already_exists === true) 
                        $scope.wordAlreadyExists = true
                    else 
                        $location.path('/view-unit').search({ b: bookId,
                            u: $scope.selectUnit._id })
                    })
        }
    }

    // dependency injection
    addWordCtrl.$inject = ['$scope', '$location', 'BookService']

    // return controller
    return addWordCtrl
})