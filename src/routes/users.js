const express = require('express');
const UserController = require('../controller/users');
const router = express.Router();

//Create - post
router.post('/users', UserController.createNewUser);

//Read - Get
router.get('/users', UserController.getAllUsers);

//UPDATE - PATCH
router.patch('/users/:idUser', UserController.updateUser);

//DELETE
router.delete('/users/:idUser', UserController.deleteUser);


module.exports = router;