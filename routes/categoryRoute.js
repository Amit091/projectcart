const express = require('express');
const router = express.Router();
const categoryController = require('./../controller/categoryController');

const auth = require('./../middleware/auth');

router.get('/',auth.isAdmin, categoryController.categoryIndex);

router.get('/add',auth.isAdmin, categoryController.getAddCategoryIndex);

router.post('/add',auth.isAdmin, categoryController.insertCategory);

router.post('/edit/:id',auth.isAdmin, categoryController.updateCategory);

router.post('/delete/:id',auth.isAdmin, categoryController.deleteCategory);

module.exports = router;