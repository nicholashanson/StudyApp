/**
 * Controller
 * View a list of units in the book.
 */
define([], function() {
    function viewBookCtrl($log, $scope, $location, BookService) {
   
        // Get bookId from query string
        var bookId = $location.search().b
        
        // Fetch book from the database.
        BookService.getBookById(bookId)
            .then(
                (response) => { 
                    $log.log(response)
                    $scope.book = response.data.book
                },
                (error) => { $log.log(error) }
            )     
              
        /**
         * Click event handler for "Add Unit" button.
         * Redirect to 'add-unit?b=bookId'
         */
        $scope.addUnit = function() {
            $location.path('/add-unit').search({ b: bookId })
        }     
    }

    // dependency injection
    viewBookCtrl.$inject = ['$log', '$scope', '$location', 'BookService']
    
    // return controller
    return viewBookCtrl
})