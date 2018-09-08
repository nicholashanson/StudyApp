/**
 * Controller.
 * View a list of all students.
 */
define([], function() {
    function studentListCtrl($log, $scope, $location, StudentService) {
        StudentService.getStudents()
            .then(
                (response) => {
                    $scope.students = response.data.students
                },
                (error) => ($log.log(error))
            )

        /**
         * Click event handler for "Add Student" button.
         * Redirect to '/register'
         */
        $scope.addStudent = function() {
            $location.path('/register')
        }
    }

    // dependency injection
    studentListCtrl.$inject = ['$log', '$scope', '$location', 'StudentService']

    // return controller
    return studentListCtrl
})

                