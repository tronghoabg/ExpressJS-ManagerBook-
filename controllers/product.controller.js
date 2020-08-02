// var db = require('../db');
var Product = require('../modles/product.model');

module.exports.index = function(req, res) {
    // var lengthProduct = products.length;
    // var numberPage = Math.ceil(lengthProduct/ 8);
    // var nPage = [];
    // for( var i = 0; i < numberPage; i++) {
    //     nPage.push('?page=' + (i + 1))
    // } 
    // var page = parseInt(req.query.page) || 1;
    // var start = (page-1) * 8;
    // var end = page * 8
    // res.render('products/index', {
    //     products: db.get('products').value().slice(start,end),
    //     nPage: nPage,
    //     pageCurrent: parseInt(req.query.page),
    // })
    Product.find().then(function(products) {
        res.render('products/index', {
            products: products,
        });
    });
}