define([
    'config',
    'controllers/addBookCtrl',
    'controllers/addUnitCtrl',
    'controllers/addSentenceCtrl',
    'controllers/addWordCtrl',
    'controllers/bookListCtrl',
    'controllers/logInCtrl',
    'controllers/navBarCtrl',
    'controllers/registrationCtrl',
    'controllers/reviewUnitCtrl',
    'controllers/studentListCtrl',
    'controllers/studentProfileCtrl',
    'controllers/viewBookCtrl',
    'controllers/viewUnitCtrl',
    'controllers/viewWordCtrl',
    'services/authService',
    'services/bookService',
    'services/studentService',
    'services/wordService',
    'modules/integratedLearningDirectives'
], function(
    config,
    addBookCtrl,
    addUnitCtrl,
    addSentenceCtrl,
    addWordCtrl,
    bookListCtrl,
    logInCtrl,
    navBarCtrl,
    registrationCtrl,
    reviewUnitCtrl,
    studentListCtrl,
    studentProfileCtrl,
    viewBookCtrl,
    viewUnitCtrl,
    viewWordCtrl,
    authService,
    bookService,
    studentService,
    wordService,
    integratedLearningDirectives) {

        // register main module
        var app = angular.module('integratedLearning', ['ngRoute', 'integratedLearningDirectives'])

        app.config(config)

        // register controllers
        app.controller('addBookCtrl', addBookCtrl)
        app.controller('addUnitCtrl', addUnitCtrl)
        app.controller('addSentenceCtrl', addSentenceCtrl)
        app.controller('addWordCtrl', addWordCtrl)
        app.controller('bookListCtrl', bookListCtrl)
        app.controller('logInCtrl', logInCtrl)
        app.controller('navBarCtrl', navBarCtrl)
        app.controller('registrationCtrl', registrationCtrl)
        app.controller('reviewUnitCtrl', reviewUnitCtrl)
        app.controller('studentListCtrl', studentListCtrl)
        app.controller('studentProfileCtrl', studentProfileCtrl)
        app.controller('viewBookCtrl', viewBookCtrl)
        app.controller('viewUnitCtrl', viewUnitCtrl)
        app.controller('viewWordCtrl', viewWordCtrl)
        
        // register services
        app.factory('AuthService', authService)
        app.factory('BookService', bookService)
        app.factory('StudentService', studentService)
        app.factory('WordService', wordService)
    })