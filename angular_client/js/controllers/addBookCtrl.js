/**
 * Controller
 * Persist a new book to the database.
 */
define([], function() {
    function addBookCtrl($location, $scope, BookService) {
   
        // Used to display error message
        $scope.bookAlreadyExists = false
                
        // Get count of all books currectly in the database.
        BookService.getBookCount()
            .then(
                (response) => { $scope.bookCount = response.data },
                (error) => { console.log(error) }
            )

        /**
         * Click event handler for the "Add Book" button
         * Persist a new book to the database.
         */                            
        $scope.addBook = function() {
            BooksService.addBook($scope.bookToAdd)
                .then(
                    (response) => {
                        if (response.data.book_already_exists === true) {
                            // Display error message
                            $scope.bookAlreadyExists = true
                        } else 
                            /**
                             * If book added successfully,
                             * redirect ot '/books'
                             */
                            $location.path('/books')
                    },
                    (error) => { $log.log(error) })    
        }                   
    }
    
    // dependency injection
    addBookCtrl.$inject = ['$log', '$location', '$scope', 'BookService']

    // return controller
    return addBookCtrl
})