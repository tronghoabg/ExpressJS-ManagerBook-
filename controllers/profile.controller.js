var db = require('../db');
var cloudinary = require('cloudinary').v2;

module.exports.index = function(req, res)  {
    var id = req.signedCookies.id;
    var user = db.get('users').find({id: id}).value();
    res.render('profile', {
        user: user
    })
};
module.exports.update = function(req, res) {
    var id = req.params.id
    db.get('users').find({id: id})
        .assign({
            name: req.body.name,
            phone: req.body.phone
        })
        .write();
    res.redirect("/profile");
};

module.exports.avatar = function(req, res) {
    var id = req.signedCookies.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('profile/avatar', {
        user: user
    })
}

module.exports.avatarPost = function(req, res) {
    
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    });
    cloudinary.uploader.upload(req.body.avatar, function(error, result) {console.log(result, error)});
    res.redirect('/profile/avatar')
}
