// require express
var express = require('express');

var userRoutes = require('./routers/user.route');
var bookRoutes = require('./routers/book.route');
var transactionRoutes = require('./routers/transaction.route');
var app = express();
var port = 3000;

app.listen(port, function() {
    console.log('Server is started at link  http://localhost:' + port)
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/transactions', transactionRoutes);

app.use("/public", express.static('public'));


// set default folder root for pug
app.set("view engine", "pug");
app.set("views", "./views");

// ++++++++++++++++++++ROUTER++++++++++++++++++++++++++++

// router home page
app.get("/", function(req,res) {
    res.render("index")
})

