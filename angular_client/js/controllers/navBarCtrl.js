/**
 * Controller.
 * Controls the navbar at the top of each page.
 */
define([], function() {
    function navBarCtrl($log, $scope, $location, AuthService) {

        $log.log('navBarCtrl loaded')

        // Highlights the active page on the navbar menu
        $scope.isActive = function(location) {
            return $location.path() === location
        }

        /**
         * Used to display options on the navbar menu
         * depending on the users's login status
         */
        $scope.isAuthed = function() {
            $log.log('navBarCtrl isAuthed called')
            return AuthService.isAuthed()
        }

        /**
         * Used to display the current students name in the navbar
         */
        $scope.currentStudent = function() {
            $log.log('navBarCtrl currentStudent called')
            return AuthService.currentStudent()
        }

        /**
         * Click event handler fo the link to the 
         * current user's profile.
         */
        $scope.goToProfile = function() {
            $log.log('goToProfile called')
            $location.path('/student-profile').search({
                s: currentStudent()._id })
        }
    }

    // dependency injection
    navBarCtrl.$inject = ['$log', '$scope', '$location', 'AuthService']

    // return controller
    return navBarCtrl
}) 
    