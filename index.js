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

//router book site

app.get("/book", function(req, res) {
    res.render('book/index', {
        books: db.get('books').value()
    });
})
 
//router  add book

app.post("/book/add", function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect("back")
})

// router delete book
app.get("/book/delete/:id", function(req, res) {
    var id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect("back");
})

//router edit site
app.get("/book/edit/:id", function(req, res) {
    var id = req.params.id
    var info = db.get('books').find( {id: id}).value()
    res.render("book/edit", {
        thisbook: info
    })
})

//router edit site post
app.post("/book/edit/:id/update", function(req, res) {
    var id = req.params.id
    db.get('books').find({id: id})
        .assign({
            name: req.body.name,
            description: req.body.description
        })
        .write();
    res.redirect("/book");
})