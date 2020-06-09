// require express
var express = require('express');
var cookieparser = require('cookie-parser'); 
var userRoutes = require('./routers/user.route');
var bookRoutes = require('./routers/book.route');
var transactionRoutes = require('./routers/transaction.route');
var cookie = require('./cookie/count.cookie');

var app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieparser());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/transactions', transactionRoutes);
app.use("/public", express.static('public'));

// set default folder root for pug
app.set("view engine", "pug");
app.set("views", "./views"); // em co 1 cai browser plugin nao do no fetch cai request thu 2
// thu disable tung extension xem tim ra thu pham roi nhe
// vang 


app.get("/", cookie.countCookie ,function(req,res) {
    res.render("index")
})

var port = 3000;

app.listen(port, function() {
    console.log('Server is started at link  http://localhost:' + port)
});