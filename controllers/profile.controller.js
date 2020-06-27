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
    var id = req.signedCookies.id
    cloudinary.config({ 
        cloud_name: process.env.CLOUND_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });
    cloudinary.uploader.upload(req.file.path, function(error, result){
        var newPath = result.url;
        db.get('users').find({id: id})
        .assign({
            avatar: newPath
        })
        .write();
    });
    res.redirect('/profile')
}
