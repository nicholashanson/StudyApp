/**
 * Config.
 * Configuration object for app.
 */
define([], function() {
    function config($routeProvider) {

        // register routes for the main app
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registrationCtrl' 
            })  
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'logInCtrl'  
            })
            .when('/books', {
                templateUrl: 'views/books.html',
                controller: 'bookListCtrl' 
            })
            .when('/add-book', {
                templateUrl: 'views/add-book.html',
                controller: 'addBookCtrl'
            })
            .when('/students', {
                templateUrl: 'views/students.html',
                controller: 'studentListCtrl'
            })
            .when('/book-view', {
                templateUrl: 'views/view-book.html',
                controller: 'viewBookCtrl'
            })
            .when('/unit-view', {
                templateUrl: 'views/view-unit.html',
                controller: 'viewUnitCtrl'
            })
            .when('/word-view', {
                templateUrl: 'views/view-word.html',
                controller: 'viewWordCtrl'
            })
            .when('/add-unit', {
                templateUrl: 'views/add-unit.html',
                controller: 'addUnitCtrl'
            }) 
            .when('/add-word', {
                templateUrl: 'views/add-word.html',
                controller: 'addWordCtrl'
            })
            .when('/add-sentence', {
                templateUrl: 'views/add-sentence.html',
                controller: 'addSentenceCtrl'
            })
            .when('/student-profile', {
                templateUrl: 'views/student-profile.html',
                controller: 'studentProfileCtrl'
            })
            .when('/recommend-a-book', {
                templateUrl: 'views/recommend-a-book',
                controller: 'recommendABookCtrl'
            })   
            .when('/review-unit', {
                templateUrl: 'views/review-unit',
                controller: 'reviewUnitCtrl'
            })
            .otherwise({redirectTo: '/'})
    }    
    
    // dependency injection
    config.$inject = ['$routeProvider']

    // return configuration object
    return config
})
    