var db = require('../db');
module.exports.postAdd = function(req, res, next) {
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
    next();
}