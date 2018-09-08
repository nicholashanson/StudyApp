var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var Student = require('./models').Student          

passport.use(new LocalStrategy({
        usernameField: 'name'
    },
    (username, password, done) => {
        Student.findOne({ name: username }, (err, student) => {
            if (err) { return done(err) }
            if (!student) {
                return done(null, false, {
                    message: 'Student by this name does not exist'
                })
            }
            if (!student.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password'
                })
            }
            return done(null, student, {
                message: '' 
            }) 
        }) 
    }
))

