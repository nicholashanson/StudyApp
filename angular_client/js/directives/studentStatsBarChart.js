define([], function() {
    function studentStatsBarChart($log) {

        /**
         * Draw a bar chat representing student stats.
         */
        function link(scope, element) {
            $log.log('studentStatsBarChart link function called')
            $log.log(scope.data)

            // method for turning camel case strings into normal strings
            var normalizeStrings = scope.methods.normalizeStrings

            /**
             * Find the largest value to be displayed in the bar chart.
             * This will be used later to scale the bar chart.
             */
            var maxVal = Math.max.apply(Math, scope.data.map(
                function(object) {return object.value})
            )

            /**
             * Create a label for each stat as a div element.
             * The next d3 call will append the actual bar to
             * the bottom of the label.
             */
            var bars = d3.select(element[0])
                .append('div')
                    .style('font-family', 'sans-serif')
                    .style('font-size', '0.7em')
                .selectAll('div')
                .data(scope.data)
                .enter()
                .append('div')
                    .text(function(d) {
                        return normalizeStrings([d.key]) + ': '
                    }) 
            
            // Create a bar as a div element and attach under the appropriate label.
            bars.append('div')

                /**
                 * Scale the chart according to the maximum value.
                 */
                .style('width', function(d) {
                    if (maxVal > 50) return d.value * 10 / maxVal + 'px'
                    else return d.value * 10 + 'px'
                })
                .style('border-radius', '10px')

                // Display a transparaten bar is the value is 0.
                .style('background-color', function(d) {
                    if (d.value === 0) return 'transparent'
                    else return 'DarkRed' 
                })
                .style('color', 'white')
                .style('line-height', '3em')
                .style('padding-right', '1em')
                .style('margin-bottom', '2px')
                .style('text-align', 'right')
                .text(function(d) {
                    return d.value
                })
        }
        return {
            link: link,
            restrict: 'E',
            scope: { 
                data: '=',
                methods: '='
            }
        }
    }
    
    // dependency injection
    studentStatsBarChart.$inject = ['$log']

    return studentStatsBarChart
})
       