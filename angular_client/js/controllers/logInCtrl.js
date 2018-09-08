/**
 * Controller
 * Login page.
 */
define([], function(){
    function loginCtrl($log, $scope, $location, AuthService) {

        /**
         * Verify the student in the database.
         * Server returns a JSON webtoken containing the student's name
         * and id
         */
        $scope.authStudent = function() {
            AuthService.authStudent($scope.studentToLogin)
                .then(
                    (response) => { 
                        $log.log(response)
                        var token = response.data.token
                        AuthService.saveToken(token)
                        var currentStudentId = AuthService.currentStudent()._id

                        // Redirects to the student's profile on log in success
                        // Redirects to '/student-profile?s=studentId
                        $location.path('/student-profile').search({ s: currentStudentId })
                    },
                    (error) => { console.log(error) }
                )
        }

    }

    // dependency injection
    loginCtrl.$inject = ['$log', '$scope', '$location', 'AuthService']

    // return controller
    return loginCtrl
})
            
            
                  