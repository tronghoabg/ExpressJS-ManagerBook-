var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller');
var middlerwares = require('../middlewares/auth.middleware');

var validate = require('../validate/user.validate');

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;