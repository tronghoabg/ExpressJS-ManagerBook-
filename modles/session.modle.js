var mongoose = require('mongoose');

var sessionShema = new mongoose.Schema({
    id:String,
    cart: Object
});
var Session = mongoose.model('Session', sessionShema, 'session');
 
module.exports = Session;