var shortid = require('shortid');
var db = require('../db')
module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        })
        db.get('sessions').push({
            id: sessionId,
        }).write();
    }
    next() 
}
module.exports.checkCart = function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    // var cart = db.get('sessions')
    //              .find({id: sessionId})
    //              .value();
    // if(cart.cart) {
    //     res.locals.cart = Object.keys(cart.cart).length;
    // }
    next();
}