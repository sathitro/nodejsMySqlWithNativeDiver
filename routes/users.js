let controller = require('../controller/userController');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', controller.index);
router.put('/', controller.insertUser);
router.get('/:id', controller.getUserById);
router.delete('/:id', controller.deleteUser);

module.exports = router;
