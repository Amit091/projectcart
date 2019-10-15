const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');

//get product list in table and index
router.get('/', productController.getProductIndex);

//get product addition form
router.get('/add', productController.getProductAdd);

//post the form submit to save product
router.post('/add', productController.saveProduct);

//display the product get by id
router.get('/:id', productController.getproductById);

//display the product get by id for edit
router.get('/edit/:id', productController.getUpdateProduct);

//update the product data with default image
router.post('/edit/:id', productController.postUpdateProduct);

//update the product gallery
router.post('/productimages/:id', productController.updateGallery);

//delete image from gallery
router.get('/delete-image/:image', productController.deleteImage);

//delete image
//update gallery
//update product

module.exports = router;