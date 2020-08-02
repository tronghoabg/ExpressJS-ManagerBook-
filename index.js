var express = require('express');
var cookieparser = require('cookie-parser'); 
var userRoutes = require('./routers/user.route');
var bookRoutes = require('./routers/book.route');
var transactionRoutes = require('./routers/transaction.route');
var cookie = require('./cookie/count.cookie');
var loginRoutes = require('./routers/auth.route');
var productRoutes = require('./routers/product.route');
var profileRoutes = require('./routers/profile.route');
var middlewareAuth = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var cartRoute = require('./routers/cart.route')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,  {
     useNewUrlParser: true,
     useUnifiedTopology: true 
     });

var app = express();
app.use(cookieparser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware, sessionMiddleware.checkCart);

app.use('/users',middlewareAuth.requireAuth, userRoutes);
app.use('/books', middlewareAuth.requireAuth, bookRoutes);
app.use('/transactions', middlewareAuth.requireAuth, transactionRoutes);
app.use('/auth', loginRoutes); 
app.use('/products', productRoutes); 
app.use('/profile', profileRoutes);
app.use("/public", express.static('public')); 
app.use('/cart', cartRoute);
// set default folder root for pug
app.set("view engine", "pug");
app.set("views", "./views"); 

app.get("/", middlewareAuth.requireAuth, function(req,res) {
    res.render("index")
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server is started at link  http://localhost:' + port)
});  

