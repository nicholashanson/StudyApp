/**
 * Factory.
 * A set of methods related to user authorization.
 */
define([], function() {
    function authService($log, $http, $window) {

        /**
         * Stores JSON web token in broweser local storage.
         * 
         * @param {JSONWebToken} token 
         */
        function saveToken(token) {
            $window.localStorage['integrated-learning-token'] = token
        }

        /**
         * Fetches JSON web token from browser local-stroage.
         * 
         * @return {JSONWebToken}
         */
        function getToken() {
            return $window.localStorage['integrated-learning-token']
        }

        /**
         * Authenticates student.
         * 
         * @param {Object} studentToLogin
         * @return {Promise}
         */
        function authStudent(studentToLogin) {
            $log.log('logInStudent API call initiated')
            return $http.post('http://localhost:3000/students/login', studentToLogin)
        }

        /**
         * Authenticates teacher.
         * 
         * @param {Object} teacherToLogin
         * @return {Promise}
         */
        function authTeacher(teacherToLogin) {
            return $http.post('http://localhost:3000/login', teacherToLogin)
        }

        /**
         * Checks whether the user is logged in.
         * 
         * @return {Boolean}
         */
        function isAuthed() {
            var token = getToken()
            if(token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]))
                $log.log(payload._id)
                return payload.exp > Date.now() / 1000
            } else 
                return false                
        }

        /**
         * Parses the JSON web token in browser local storage to return 
         * user info.
         * 
         * @return {Boolean}
         */
        function currentStudent() {
            if (isAuthed()){
                var token = getToken()
                var payload = JSON.parse($window.atob(token.split('.')[1]))
                $log.log(payload)
                return {
                    _id : payload._id,
                    name: payload.name
                }
            }
        }

        return {
            saveToken : saveToken,
            getToken : getToken,
            authStudent: authStudent,
            authTeacher: authTeacher,
            isAuthed: isAuthed,
            currentStudent: currentStudent
        }
    }

    // dependency injection
    authService.$inject = ['$log', '$http', '$window']

    return authService
})
        
