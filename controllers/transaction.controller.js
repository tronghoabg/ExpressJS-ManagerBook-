var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('transactions/index', {
        listUsers: db.get('users').value(),
        listBooks: db.get('books').value(),
        transactions: db.get('transactions').value()
    });
};

module.exports.postCreate =  function(req, res) {
    var date = new Date();
    req.body.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    req.body.time = date.getHours() + ':' + date.getMinutes();
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions');
};

module.exports.complete = function(req, res) {
    var id = req.params.id;
    var check =  db.get('transactions').find( {id: id}).value()
    if (!check) {
        res.send('Không tồn tại id này')
    }{
        db.get('transactions').find( {id: id})
        .assign({
            isCompleted: true
        })
        .write();
    res.redirect('/transactions');
    }
}