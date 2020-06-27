var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({ dest: 'public/uploads/' })

var controller = require('../controllers/profile.controller');

router.get('/', controller.index);
router.get('/avatar', controller.avatar);
router.post('/:id/update', controller.update);

router.post('/avatar/upload', upload.single('avatar'), controller.avatarPost);

module.exports = router; 