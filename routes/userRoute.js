const express = require('express');
const router = express.Router();

const userController = require('./../controller/userController');

// express().set('layout', 'layout/layoutB');
// router.all("/*", (req, res, next) => {
//     console.log("form herer");
//     express().set('layout', 'layout/adminLayout');
//     next();
// });

//{ layout: 'layout/adminLayout' }

//login page
router.get('/login', userController.getUserLoginPage);

//login post 
router.post('/login', userController.postLoginPage);

//register page
router.get('/register', userController.getUserRegisterPage);

//register form submission
router.post('/register', userController.postUserRegisterPage);

router.get('/all', userController.getAllUser);

router.get('/logout', userController.userLogout);

module.exports = router;