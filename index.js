// require express
var express = require('express');
var app = express();
var port = 3000;
app.listen(port, function() {
    console.log('Server is started at link  http://localhost:' + port)
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// require low
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({books: []})
  .write()
  db.defaults({users: []})
  .write()
// require  short id
var shortid = require('shortid');

// set default folder root for pug
app.set("view engine", "pug");
app.set("views", "./views");


// ++++++++++++++++++++ROUTER++++++++++++++++++++++++++++

// router home page
app.get("/", function(req,res) {
    res.render("index")
})

//router books site

app.get("/books", function(req, res) {
    res.render('books/index', {
        books: db.get('books').value()
    });
})
 
//router  add books

app.post("/books/add", function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect("back")
})

// router delete books
app.get("/books/delete/:id", function(req, res) {
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect("back");
})

//router edit site
app.get("/books/edit/:id", function(req, res) {
    var id = req.params.id
    var info = db.get('books').find( {id: id}).value()
    res.render("books/edit", {
        thisbook: info
    })
})

//router edit site post
app.post("/books/edit/:id/update", function(req, res) {
    var id = req.params.id
    db.get('books').find({id: id})
        .assign({
            name: req.body.name,
            description: req.body.description
        })
        .write();
    res.redirect("/books");
})




//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------




//router users site

app.get("/users", function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
})
 
//router  add users

app.post("/users/add", function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("back")
})

// router delete users
app.get("/users/delete/:id", function(req, res) {
    var id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("back");
})

//router edit site
app.get("/users/edit/:id", function(req, res) {
    var id = req.params.id
    var info = db.get('users').find( {id: id}).value()
    res.render("users/edit", {
        thisuser: info
    })
})

//router edit site post
app.post("/users/edit/:id/update", function(req, res) {
    var id = req.params.id
    db.get('users').find({id: id})
        .assign({
            name: req.body.name,
            phone: req.body.phone
        })
        .write();
    res.redirect("/users");
})