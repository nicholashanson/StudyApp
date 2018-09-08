/**
 * Directives module.
 * 
 * @param {Directive} addWordToSentence
 * @param {Directive} studentStatsBarChart
 */
define(['directives/addWordToSentence',
    'directives/studentStatsBarChart'
], function(addWordToSentence, studentStatsBarChart) {

    // register directives module
    var directives = angular.module('integratedLearningDirectives', [])

    // register directives
    directives.directive('addWordToSentence', addWordToSentence)
    directives.directive('studentStatsBarChart', studentStatsBarChart)
})