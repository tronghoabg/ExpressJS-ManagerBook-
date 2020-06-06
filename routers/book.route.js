var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');

router.get("/", controller.index);

router.post("/add", controller.postAdd);

router.get("/delete/:id", controller.delete);

router.get("/edit/:id", controller.edit);

router.post("/edit/:id/update", controller.postEdit);

module.exports = router;