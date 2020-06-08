var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.postAdd = function(req, res) {
    req.body.id = shortid.generate();
    var error = [];
    if(!req.body.name || req.body.name.length > 30){
        error.push('Không được để trống tên hoặc không quá 30 ký tự')
    }
    if(!req.body.phone || req.body.phone.length > 11 || req.body.phone.length < 9){
        error.push('Không được để trống SDT hoặc sai định dạng SDT!')
    }
    if(error.length) {
        res.render('users/index', {
            users: db.get('users').value(),
            error: error,
            values: req.body
        });
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect("/users")
};

module.exports.delete = function(req, res) {
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("back");
};

module.exports.edit = function(req, res) {
    var id = req.params.id
    var info = db.get('users').find( {id: id}).value()
    res.render("users/edit", {
        thisuser: info
    })
};

module.exports.postEdit =  function(req, res) {
    var id = req.params.id
    db.get('users').find({id: id})
        .assign({
            name: req.body.name,
            phone: req.body.phone
        })
        .write();
    res.redirect("/users");
};
