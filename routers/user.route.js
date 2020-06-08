var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
router.get("/", controller.index);
 
router.post("/add", validate.postAdd, controller.postAdd);

router.get("/delete/:id", controller.delete);

router.get("/edit/:id", controller.edit);

router.post("/edit/:id/update", controller.postEdit);

module.exports = router;