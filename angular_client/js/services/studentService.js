/**
 * Factory.
 * A set of methods related to the "students" collection in the database.
 * in the database.
 */
define([], function() {
    function studentService($log, $http) {

        /**
         * Fetches a student document from the database.
         * 
         * @param {ObjectId}
         * @return {Promise}
         */
        function getStudentById(id) {
            $log.log('getStudent API call initiated')
            return $http.get('http://localhost:3000/students/' + id)
        }

        /**
         * Fetches an array of all students from the databse.
         * 
         * @return {Promise}
         */
        function getStudents() {
            $log.log('getStudents API call initiated')
            return $http.get('http://localhost:3000/students')
        }

        /**
         * Persists a new student to the database.
         * 
         * @param {Object}
         * @return {Promise}
         */
        function addStudent(studentToAdd) {
            $log.log('addStudent API call initiated')
            return $http.post('http://localhost:3000/students', studentToAdd)
        }

        /**
         * Fetches a count of all students in the database.
         * 
         * @return {Promise}
         */
        function getStudentCount() {
            $log.log('studentCount API call initiated')
            return $http.get('http://localhost:3000/students/count')
        }

        /**
         * Increments a counter in the database every time a student views a word
         * or answers a question.
         * 
         * @param {ObjectId}
         * @param {String|Array}
         */
        function logView(id, propertiesToInc) {
            propertiesToInc.forEach((propertyToInc) => {
                $http.put('http://localhost:3000/students/' + id, { 
                    incProperty: propertyToInc })
            })
        }

        return {
            getStudentById: getStudentById,
            getStudents: getStudents,
            addStudent: addStudent,
            getStudentCount: getStudentCount,
            logView: logView
        }
    }
    
    // dependency injection
    studentService.$inject = ['$log', '$http']
    
    // return service
    return studentService
})
  
            
