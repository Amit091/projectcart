const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');


router.get('/', (req, res) => {
    console.log('From Sesion  via admin post');
    console.log(req.user);
    //    req.flash('success_msg', `User Login  ${req.user.role}`)
    res.render('admin/index', { layout: 'layout/adminLayout' });
});

router.get('/product', (req, res) => {
    res.render('home/product');
});
module.exports = router;