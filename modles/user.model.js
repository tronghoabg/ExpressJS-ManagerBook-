var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: String,
    password: String,
    isAdmin: Boolean,
    name: String,
    phone: String,
    id: String,
    avatar: String
});
var User = mongoose.model('User', userSchema, 'user');

module.exports = User;