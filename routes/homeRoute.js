const express = require('express');
const router = express.Router();
const user = require('./../models/user');


router.get('/', (req, res) => {
    res.render('home/home');
});
router.get('/product1', (req, res) => {
    console.log('home product');

    res.render('product/addProduct');
});
module.exports = router;