const express = require('express');
const router = express.Router();
const con = require('./../helpers/dbConnection');
const cateDao = require('./../DAO/category_dao');
const dao = new cateDao();
const categoryController = require('./../controller/categoryController');

router.get('/', categoryController.getAllCategory);

router.get('/add', (req, res) => {
    res.render('category/addCat');
});

router.post('/add', categoryController.insertCategory);
router.post('/edit/:id', categoryController.updateCategory);
router.post('/delete/:id', categoryController.deleteCategory);

module.exports = router;