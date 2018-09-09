var crypto = require('crypto')
var jwt = require('jsonwebtoken')

/**
 * Hash password and persist to database.
 * 
 * @param {String} password 
 */
var setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

/**
 * Hash user entered password and compare to
 * password hash in database.
 * 
 * @param {String} password 
 * @return {Boolean}
 */
var validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

/**
 * Create JSON web token to return to 
 * browser on successful authentication.
 * The payload contains the user's id and name.
 * 
 * @return {JSONWebToken}
 */
var generateJwt = function() {
    let expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    } , 'jumanji')
}

var auth = {
    setPassword: setPassword,
    validPassword: validPassword,
    generateJwt: generateJwt
}

module.exports = auth
