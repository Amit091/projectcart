const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/', (req, res) => {
    res.render('product/index');
});
router.get('/add', (req, res) => {
    res.render('product/addProduct');
});
module.exports = router;