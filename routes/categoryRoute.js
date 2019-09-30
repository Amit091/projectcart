const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('category/index');
});
router.get('/add', (req, res) => {
    res.render('category/addCat');
});
module.exports = router;