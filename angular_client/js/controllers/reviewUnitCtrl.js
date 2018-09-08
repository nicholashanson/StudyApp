/**
 * Controller.
 * Review the words in the unit.
 * The view contains an image and four multiple-choice answers.
 */
define([], function() {
    function reviewUnitCtrl($log, $scope, $location, $route, BookService, StudentService, AuthService,
        WordService) {
                                         
        $log.log('Loaded reviewUnitCtrl')

        // Get ids from the query string.
        var bookId = $location.search().b
        var unitId = $location.search().u

        // Fetch the book from the database.
        BookService.getBookById(bookId)
            .then(
                (response) => {
                    $log.log(response)
                    $scope.units = response.data.book.units
                    $scope.unit = BookService.getUnitById(unitId,$scope.units)
                    $scope.words = $scope.unit.words

                    /**
                     * Get four random words from the unit to display
                     * as multiple-choice anwers.
                     */
                    $scope.options = WordService.getNRandomWords($scope.words,4)

                    /** 
                     * Random select a word from the four random words to
                     * use as the correct answer.
                     */
                    $scope.correctAnswer = $scope.options[Math.floor(Math.random() * $scope.options.length)]
                }
            )

        /**
         * Checks if the user has already answered.
         * Used by the view to display message after the user
         * has ansered.
         * 
         * @return {Boolean}
         */
        $scope.answered = function() {
            return $scope.answeredCorrectly !== undefined
        }

        /**
         * Click event handler for the "Next" button
         * Readloads the page with the next word
         */
        $scope.next = function() {
            $route.reload()
        }

        /**
         * Update totalWordsViewed and totalReviewWordsView in the database
         * if the user is logged in.
         */
        if (AuthService.isAuthed())
            StudentService.logView(AuthService.currentStudent()._id, ['totalWordsViewed',
                'totalReviewWordsViewed'])

        /**
         * Gets the value of the multiple-choice answer clicked and compares
         * it to the correct answer.
         * 
         * @param {Event} $event 
         */
        $scope.submitAnswer = function($event) {
            var givenAnswer = angular.element($event.target).text().trim()
            if (givenAnswer === $scope.correctAnswer.value) {
                /**
                 * Update stats if student is logged in.
                 */
                if (AuthService.isAuthed())                        
                    StudentService.logView(AuthService.currentStudent()._id, 
                        ['totalWordsAnsweredCorrectly'])
                $scope.answeredCorrectly = true
            } else {
                /**
                 * Update stats if student is logged in.
                 */
                if (AuthService.isAuthed())                        
                    StudentService.logView(AuthService.currentStudent()._id, 
                        ['totalWordsAnsweredIncorrectly'])
                $scope.answeredCorrectly = false
            }   
        }
    }

    // dependency injection
    reviewUnitCtrl.$inject = ['$log', '$scope', '$location', '$route', 'BookService', 'StudentService',
        'AuthService', 'WordService']
    
    // return controller
    return reviewUnitCtrl
})

                  