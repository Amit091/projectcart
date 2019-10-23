const express = require('express');
const router = express.Router();
const user = require('./../models/user');

router.get('/', (req, res) => {
    res.render('home/home'),
        (err, out) => {
            if (err) {
                console.log(err);
                res.send({ status: false });
            } else {
                res.send({
                    status: true,
                    htmlData: out,
                });
            }
        };
});

router.get('/product1', (req, res) => {
    console.log('home product');
    res.render('product/addProduct');
});

router.get('/test', (req, res) => {
    res.render('home/test');
});
module.exports = router;