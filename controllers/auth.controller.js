require('dotenv').config();
var db = require('../db');
var md5 = require('md5')
var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');


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

    if(user){
        var countWrong = db.get('wrongLoginCount').find({userId: userId}).value()
            if(countWrong) {
                if(countWrong.count >= 6) {       
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    var msg = {
                        to: "tronghoabg@gmail.com",
                        from: "tronghoabg@gmail.com",
                        subject: "Ai đó đang cố gắng đang nhập vào tài khoản của bạn",
                        text: "Ai đó đang cố gắng đang nhập vào tài khoản của bạn, hoặc bạn nhập khẩu sai quá nhiều lần!!!",
                        html: "<h1>Cảnh Báo</h1><p>Ai đó đang cố gắng đang nhập vào tài khoản của bạn, hoặc bạn nhập khẩu sai quá nhiều lần!!!</p>"
                    }
                    sgMail.send(msg);
                    res.render('auth/login', {
                        error: ['bạn đã nhập sai mật khẩu! ' + countWrong.count + ' lần !!!'],
                        values: req.body
                    })
                }
            }
    }
    var saltRounds = 10;    
    var check = bcrypt.compareSync(password, user.password)

    if(!check){
        var userBody = {
            userId: req.body.userId,
            count: 1
        };
        var user = db.get('wrongLoginCount').find({userId: userBody.userId}).value();
        if (!user) {
            db.get('wrongLoginCount').push(userBody).write();
        }else{
            db.get('wrongLoginCount').find({userId: userBody.userId})
            .assign( {
                count: user.count + 1
            }).write()
        }
        res.render('auth/login', {
            error: ['Wrong password!'],
            values: req.body
        })
    } 
    res.cookie('id', user.id, {
        signed: true
    })
    res.redirect('/users')
}
