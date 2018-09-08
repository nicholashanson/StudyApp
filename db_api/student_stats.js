var Student = require('./models').Student
var sendJsonResponse = require('../helpers').sendJsonResponse

/**
 * Increment a property in the stats subdocument of a student document
 */
function incProperty(req, res) {
    Student.findOneAndUpdate(
        { _id: req.params.id, 'stats.key': req.body.incProperty },
        { $inc: { 'stats.$.value': 1 } }
    )
            .exec(
                (err, student) => {
                    if (err) 
                        sendJsonResponse(res, 404, err)
                    else 
                        sendJsonResponse(res, 200, 
                            student.stats)
                })        
}

var callbacks = {
    incProperty: incProperty
}

/** 
 * A list of stats that are added to a student document on creation.  
 */
var stats = [
    'totalWordsViewed',
    'totalReviewWordsViewed',
    'totalWordsAnsweredCorrectly', 
    'totalWordsAnsweredIncorrectly'
]

var student_stats = {
    callbacks: callbacks,
    stats: stats
}

module.exports = student_stats