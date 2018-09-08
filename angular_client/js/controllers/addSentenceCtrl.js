/**
 * Controller.
 * Add a sentence to an existing unit.
 */
define([], function() {
    function addSentenceCtrl($scope, $location, BookService) {

        // Get ids from query string.
        var bookId = $location.search().b
        var unitId = $location.search().u

        // Used to display error message.
        $scope.sentenceAlreadyExists = false

        // Fetch book from the database.
        BookService.getBookById(bookId)
            .then(
                (response) => {
                    $scope.units = response.data.units

                    /**
                     * If the query string contains a unitId, 
                     * use this as the default option in the selector.
                     * If not, use the first unit in the book.
                     */
                    $scope.selectUnit = unitId
                        ? BookService.getUnitById(unitId,$scope.units)
                        : $scope.units[0]
                },
                (error) => { $log.log(error) }
            )

        /**
         * Click event handler for the "Add Sentence" button.
         * Add new sentence to existing unit. 
         */    
        $scope.addSentence = function() {
            BookService.addSentence(bookId, $scope.selectUnit._id, $scope.sentenceToAdd)
                .then(
                    (response) => {
                        if (response.data.sentence_already_exists === true) 
                            /**
                             * Display error message.
                             * Stay on current page.
                             */
                            $scope.sentenceAlreadyExists = true 
                        else 
                            /**
                             * If sentences added successfully,
                             * redirect to '/view-unit?b=bookId&u=unitId
                             */
                            $location.path('/view-unit').search({ b: bookId,
                                u: $scope.selectUnit._id })   
                    },
                    (error) => { $log.log(error) }
                )
        }
    }

    // dependency injection
    addSentenceCtrl.$inject = ['$log', '$scope', '$location', 'BookService']

    // return controller
    return addSentenceCtrl
})
   
      
