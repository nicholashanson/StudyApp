/**
 * Bootstrap main module
 */
define(['modules/integratedLearning'], function() {

    function boot() {
        // assign main module to the html tag
        angular.bootstrap(document, ['integratedLearning'])
    }

    return {
        boot: boot
    }
})