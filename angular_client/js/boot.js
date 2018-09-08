/**
 * Declare app dependencies.
 */
require.config({
    baseUrlL: 'js',
    paths: {
        Angular: 'https://cdn.bootcss.com/angular.js/1.2.19/angular.min',
        ngRoute: 'https://cdn.bootcss.com/angular.js/1.2.19/angular-route.min',
        modules: './modules',
        controllers: './controllers',
        services: './services',
        config: './config',
        directives: './directives'
    },
    shim: {
        'ngRoute': ['Angular'],
        'App': ['ngRoute']
    }
})

// Bootstrap the app
require(['App'], function(App) {
    App.boot()
})