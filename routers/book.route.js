var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get("/", function(req, res) {
    res.render('books/index', {
        books: db.get('books').value()
    });
})
 
//router  add books
router.post("/add", function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect("back")
})

// router delete books
router.get("/delete/:id", function(req, res) {
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect("back");
})

//router edit site
router.get("/edit/:id", function(req, res) {
    var id = req.params.id
    var info = db.get('books').find( {id: id}).value()
    res.render("books/edit", {
        thisbook: info
    })
})

//router edit site post
router.post("/edit/:id/update", function(req, res) {
    var id = req.params.id
    db.get('books').find({id: id})
        .assign({
            name: req.body.name,
            description: req.body.description
        })
        .write();
    res.redirect("/books");
})

module.exports = router;