var expect = require('chai').expect
 
var Student = require('./models').Student
 
describe('student', function() {
    it('should be invalid if name is empty', function(done) {
        var s = new Student()
 
        m.validate(function(err) {
            expect(err.errors.name).to.exist
            done()
        })
    })
})
