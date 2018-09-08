// Directive for creating a dymanic list for registering words with a sentence.
define([], function() {
    function addWordToSentence($compile) {
        function link(scope) {
            scope.id = 1

            scope.incrementId = () => {
                scope.id += 1
            }
            
            scope.decrementId = () => {
                scope.id -= 1
            }

            // Don't allow the user to remove the last element from the list
            scope.lastElement = function() {
                return $('#words-to-add div').length
            }

            // Add an item to the list of words.
            scope.addWord = function() {
                scope.incrementId()
                var wordList = $('#words-to-add')
                var elementToCopy = wordList.last()
                var elementToAdd = elementToCopy.clone()
                elementToAdd.id = 'word-to-add-' + scope.id
                // Compile the element so that data-binding continues to work.
                var compiledElementToAdd = $compile(elementToAdd)(scope)
                angular
                    .element($('#words-to-add'))
                    .append(compiledElementToAdd)
            }

            // Removes an item from the list of words.
            scope.remove = function($event) {
                var element = angular.element($event.target)
                element.parent().remove()
                scope.decrementId()
            }
        }
        return {
            link: link,
            templateUrl: 'views/add-word-to-sentence',
            restrict: 'E'
        }
    }

    return addWordToSentence
})

