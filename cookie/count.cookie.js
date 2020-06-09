var db = require('../db');

module.exports.countCookie = function(req, res, next) {
    res.cookie('user-id', 'tronghoabg');

    count = db.get('cookie').find({name: 'cookies'}).value().count
    db.get('cookie').find({name: 'cookies'})
        .assign({
            count: count+=1
        }).write();
        
    console.log(count);

    next();
}