const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('home/home');
});
router.get('/product', (req, res) => {
    res.render('home/product');
});
module.exports = router;