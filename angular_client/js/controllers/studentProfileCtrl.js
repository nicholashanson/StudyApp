/**
 * Controller.
 * View a student's profile.
 */
define([], function() {
    function studentProfileCtrl($log, $scope, $location, StudentService, WordService) {
    
        // Get studentId from the query string.
        var studentId = $location.search().s

        // method from WordService to pass studentStatsBarChart directive
        $scope.utils = { normalizeStrings: WordService.normalizeStrings }

        // Fetch the student from the databse
        StudentService.getStudentById(studentId)
            .then(
                (response) => {
                    $scope.student = response.data.student
                    $scope.stats = $scope.student.stats
                    // Tell directive that the data it needs is ready
                    $scope.dataLoaded = true
                },
                (err) => ($log.log(error))
            )
    }
    
    // dependency injection
    studentProfileCtrl.$inject = ['$log', '$scope', '$location', 'StudentService', 'WordService']

    // return controller
    return studentProfileCtrl
})

     