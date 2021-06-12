const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');
const auth = require('./../middleware/auth');

//get product list in table and index
router.get('/', auth.isAdmin, productController.getProductIndex);

//get product addition form
router.get('/add', auth.isAdmin, productController.getProductAdd);

//post the form submit to save product
router.post('/add', auth.isAdmin, productController.saveProduct);

//display the product get by id
router.get('/:id', productController.getproductById);

//display the product get by id for edit
router.get('/edit/:id', auth.isAdmin,  productController.getUpdateProduct);

//update the product data with default image
router.post('/edit/:id', auth.isAdmin,  productController.postUpdateProduct);

//update the product gallery
router.post('/update-gallery/:id',auth.isAdmin,  productController.updateGallery);

//delete image from gallery
router.delete('/delete-image/:image',auth.isAdmin,  productController.deleteImage);

//delete image
//update gallery
//update product

//delete product
router.get('/delete/:id',auth.isAdmin,  productController.deleteProduct);

//router.get('/category/:id', productController.getProductByCategory);

router.get('/ajax/getall', productController.getAllProductAjax);

router.get('/ajax/getByCategory', productController.getByCategory);


module.exports = router;