var express = require('express');
var router = express.Router();

var controller = require('../controllers/profile.controller');

router.get('/', controller.index);
router.get('/avatar', controller.avatar);
router.post('/:id/update', controller.update);

router.post('/avatar/upload', controller.avatarPost);

module.exports = router; 