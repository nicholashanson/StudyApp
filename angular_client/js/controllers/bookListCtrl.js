/**
 * Controller.
 * View a list of all books in the database.
 */
define([], function() {
    function bookListCtrl($log, $scope, $location, BookService) {
        
        // Fetch all books from the database
        BookService.getBooks()
            .then(
                (response) => { $scope.books = response.data.books },
                (error) => { $log.log(error) }
            )

        /**
         * Click event handler for "Add Book" button
         * Redirects to 'add/book'
         */
        $scope.addBook = function() {
            $location.path('/add-book')
        }
    }

    // dependency injection
    bookListCtrl.$inject = ['$log', '$scope', '$location', 'BookService']

    // return controller
    return bookListCtrl
})
        
