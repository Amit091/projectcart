const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');


router.get('/', productController.getProductIndex);

router.get('/add', productController.getProductAdd);

router.post('/add', productController.saveProduct);

router.get('/:id', productController.getproductById);

router.get('/edit/:id', productController.getUpdateProduct);

router.post('/edit/:id', productController.getUpdateProduct);

router.post('/productimages/:id', productController.getUpdateProduct);

module.exports = router;