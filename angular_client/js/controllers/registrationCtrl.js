/**
 * Controller.
 * Register a new student in the database.
 */
define([], function() {
    function registrationCtrl($log, $scope, $location, StudentService) {

        // Used to display error message
        $scope.studentAlreadyExists = false

        /**
         * Get the count of all students in the database.
         * Displayed at the bottom of the form.
         */
        StudentService.getStudentCount()
            .then(
                (response) => { $scope.studentCount = response.data }, 
                (error) => { $log.log(error) }
            )

        /**
         * Persist a new student to the database.
         */  
        $scope.addStudent = function() {
            StudentService.addStudent($scope.studentToAdd).then(
                (response) => {
                    // Display error message
                    if (response.data.student_already_exists === true) 
                        $scope.studentAlreadyExists = true
                    // Redirect to '/students' if student registered successfully
                    else $location.path('/students')
                },
                (error) => { $log.log(error) } )
        }
    }

    // dependency injection
    registrationCtrl.$inject = ['$log', '$scope', '$location', 'StudentService']
    
    // return controller
    return registrationCtrl
})
                   
                
                
        
                             
             
        
        
        