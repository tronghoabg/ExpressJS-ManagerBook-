var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('transactions/index', {
        listUsers: db.get('users').value(),
        listBooks: db.get('books').value(),
        transactions: db.get('transactions').value()
    });
});

router.post('/create', function(req, res) {
    var date = new Date();
    req.body.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    req.body.time = date.getHours() + ':' + date.getMinutes();
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions')
})
module.exports = router;