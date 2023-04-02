const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser, userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.getUser, userController.updateUserById);
router.delete('/:id', userController.getUser, userController.deleteUserById);

module.exports = router;
