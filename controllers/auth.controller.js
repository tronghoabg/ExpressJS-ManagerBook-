var db = require('../db');

module.exports.login = function(req, res) {
    res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
    var userId = req.body.userId;
    var password = req.body.password;  
    var user = db.get('users').find({userId: userId}).value();
    if(!user){
        res.render('auth/login', {
            error: ['user dose not exits!'],
            values: req.body
        })
    }
    if(user.password !== password){
        res.render('auth/login', {
            error: ['Wrong password!'],
            values: req.body
        })
    } 
    res.cookie('id', user.id)
    res.redirect('/users')
}
