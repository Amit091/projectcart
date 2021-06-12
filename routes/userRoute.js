const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');
const auth = require('./../middleware/auth');

//login page
router.get('/login', userController.getUserLoginPage);

//login post 
router.post('/login', userController.postLoginPage);

//register page
router.get('/register', userController.getUserRegisterPage);

//register form submission
router.post('/register', userController.postUserRegisterPage);

//get user list
router.get('/all', auth.isAdmin, userController.getAllUser);



//logout
router.get('/logout', auth.isLogin, userController.userLogout);

module.exports = router;