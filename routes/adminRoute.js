const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('admin/index', { layout: 'layout/adminLayout' });
});
router.get('/product', (req, res) => {
    res.render('home/product');
});
module.exports = router;