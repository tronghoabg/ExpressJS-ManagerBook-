var db = require('../db');

module.exports.index = function(req, res) {
    var lengthProduct = db.get('products').value().length;
    var numberPage = Math.ceil(lengthProduct/ 8);
    var nPage = [];
    for( var i = 0; i < numberPage; i++) {
        nPage.push('?page=' + (i + 1))
    }
    var page = parseInt(req.query.page) || 1;
    var start = (page-1) * 8;
    var end = page * 8
    var sessionId = req.signedCookies.sessionId;
    res.render('products/index', {
        products: db.get('products').value().slice(start,end),
        nPage: nPage,
        pageCurrent: parseInt(req.query.page),
    })
}