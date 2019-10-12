const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');


router.get('/', productController.getProductIndex);

router.get('/add', productController.getProductAdd);

router.post('/add', productController.saveProduct);

module.exports = router;