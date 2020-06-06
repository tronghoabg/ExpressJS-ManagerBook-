var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('books/index', {
        books: db.get('books').value()
    });
};

module.exports.postAdd = function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect("back")
};

module.exports.delete = function(req, res) {
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect("back");
};

module.exports.edit = function(req, res) {
    var id = req.params.id
    var info = db.get('books').find( {id: id}).value()
    res.render("books/edit", {
        thisbook: info
    })
};

module.exports.postEdit =  function(req, res) {
    var id = req.params.id
    db.get('books').find({id: id})
        .assign({
            name: req.body.name,
            description: req.body.description
        })
        .write();
    res.redirect("/books");
};
