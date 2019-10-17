const express = require('express');
const router = express.Router();
const categoryController = require('./../controller/categoryController');

router.get('/', categoryController.getAllCategory);

router.get('/add', categoryController.getAddCategoryIndex);

router.post('/add', categoryController.insertCategory);

router.post('/edit/:id', categoryController.updateCategory);

router.post('/delete/:id', categoryController.deleteCategory);

module.exports = router;