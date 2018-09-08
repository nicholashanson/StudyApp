/**
 * Controller
 * Add a new unit to an existing book.
 */
define([], function() {
    function addUnitCtrl($log, $scope, $location, BookService) {

        // Get the bookId from the query string
        var bookId = $location.search().b

        // Used to display error message
        $scope.unitAlreadyExists = false  
        
        // Fetch all books from the database
        BookService.getBooks()
            .then(
                (response) => {
                    $scope.books = response.data.books

                    // Use books as options in the selector
                    $scope.selectBook = bookId ? getBook(bookId,$scope.books) : $scope.books[0]
                }
            )
        
        /**
         * Helper function to get book form list of books.
         * 
         * @param {ObjectId} bookId
         * @param {Document|Array} books
         * @return {Document}
         */   
        function getBook(bookId, books) {
            books.forEach((book) => {
                if (bookId === book._id)
                    return book
            })
        }

        /**
         * Click event handler for "Add Unit" button.
         * Displays error message if unit already exists.
         * Redirects to '/book-view?b=bookId' if unit added
         * successfully.
         */
        $scope.addUnit = function() {
            BookService.addUnit($scope.selectBook._id, $scope.unitToAdd)
                .then((response) => {
                    if (response.data.unit_already_exists === true) 
                        $scope.unitAlreadyExists = true
                    else 
                        $location.path('/book-view').search({ b: $scope.selectBook._id })
                        
                }, (error) => { $log.log(error) })
        }
    } 

    // dependency injection
    addUnitCtrl.$inject = ['$log', '$scope', '$location', 'BookService']

    // return controller
    return addUnitCtrl
})