const express = require('express');
const router = express.Router();

express().set('layout', 'layout/layoutB');
router.all("/*", (req, res, next) => {
    console.log("form herer");
    express().set('layout', 'layout/layoutB');
    next();
});

//{ layout: 'layout/adminLayout' }

router.get('/', (req, res) => res.send('User Route'));

router.get('/login', (req, res) => {
    res.render('user/login');
});
router.get('/all', (req, res) => {
    res.render('admin/userList', { layout: 'layout/adminLayout' });
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});
module.exports = router;