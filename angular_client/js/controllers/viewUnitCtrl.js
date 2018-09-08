/**
 * Controller
 * View a list of words in the unit.
 */
define([], function () {
    function viewUnitCtrl($log, $scope, $location, BookService) {

        // Get ids from query string
        var bookId = $location.search().b
        var unitId = $location.search().u

        // Fetch book from the database
        BookService.getBookById(bookId)
            .then(
                (response) => {
                    $scope.book = response.data.book
                    $scope.units = $scope.book.units
                    $scope.unit = BookService.getUnitById(unitId, $scope.units)
                },
                (error) => (console.log(error))    
            )    
            
        /**
         * Click event handler for "Review" button.
         * Redirect to '/review-unit?b=bookId&u=unitId'
         */
        $scope.reviewUnit = function() {
            $location.path('review-unit').search({ b: bookId, 
                u: unitId })
        }

        /**
         * Click event handler for "Add Word" button.
         * Redirect to '/add-word?b=bookId&u=unitId'
         */
        $scope.addWord = function() {
            $location.path('/add-word').search({ b: bookId,
                u: unitId })
        }

        /**
         * Click event handler for "Add Sentence" button.
         * Redirect to '/add-sentence?b=bookId&u=unitId'
         */
        $scope.addSentence = function() {
            $location.path('/add-sentence').search({ b: bookId,
                u: unitId })
        }
    }

    // dependency injection
    viewUnitCtrl.$inject = ['$log', '$scope', '$location', 'BookService']

    return viewUnitCtrl
})