var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

//router users site

router.get("/", function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
})
 
//router  add users

router.post("/add", function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("back")
})

// router delete users
router.get("/delete/:id", function(req, res) {
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("back");
})

//router edit site
router.get("/edit/:id", function(req, res) {
    var id = req.params.id
    var info = db.get('users').find( {id: id}).value()
    res.render("users/edit", {
        thisuser: info
    })
})

//router edit site post
router.post("/edit/:id/update", function(req, res) {
    var id = req.params.id
    db.get('users').find({id: id})
        .assign({
            name: req.body.name,
            phone: req.body.phone
        })
        .write();
    res.redirect("/users");
})

module.exports = router;