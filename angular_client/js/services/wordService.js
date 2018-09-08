/**
 * Factory. 
 * A set of utiliy methods.
 */
define([], function() {
    function wordService($log) {

        /**
         * Helper method to use in directives.
         * 
         * Turn 'aStringLikeThis' to 'A String Like This'
         * 
         * @param {String|Array} strings 
         * @return {String|Array}
         */
        function deCamelizeStrings(strings) {
            var stringsToReturn = strings.map(function(str) {
                str.replace(/([A-Z])/g, ' $1')
                str = str.charAt(0).toUpperCase() + str.slice(1)
                return str
            })
            return stringsToReturn
        }

        /**
         * Helper method to use in directives.
         * 
         * Turn 'aStringLikeThis' to 'A string like this'
         * @param {String|Array}
         * @return {String|Array}
         */
        function normalizeStrings(strings) {
            var stringsToReturn = strings.map(function(str) {
                str = str.replace(/([A-Z])/g, ' $1')
                str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                return str
            })
            return stringsToReturn
        }

        /**
         * Get n random elements from an array without duplicateds.
         * 
         * @param {Any|Array} words 
         * @param {Number} n
         * @return {Any|Array}
         */
        function getNRandomWords(words, n) {
            let result = []
            while (n--) {
                const randomIndex = 
                Math.floor(Math.random() * words.length)
                $log.log(randomIndex)
                if (result.includes(words[randomIndex])) {
                    $log.log('Duplicate detected')
                    n++
                    continue
                }
                $log.log(words[randomIndex])
                result[result.length] = words[randomIndex]
            } 
            return result
        }

        return {
            deCamelizeStrings: deCamelizeStrings,
            normalizeStrings: normalizeStrings,
            getNRandomWords: getNRandomWords
        }
    }

    // dependency injection
    wordService.$inject = ['$log']

    // return service
    return wordService
})