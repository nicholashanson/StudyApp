var expect = require('chai').expect
 
var Book = require('../models').Book
 
describe('book', function() {
    it('should be invalid if title is empty', function(done) {
        var b = new Book()
 
        b.validate(function(err) {
            expect(err.errors.name).to.exist
            done()
        })
    })
})
