const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');
const cartController = require('./../controller/cartController');
const homeController = require('./../controller/homeController');
const auth = require('./../middleware/auth')

//to root page
router.get('/', homeController.getHomePage);

//testing
// router.get('/product1', (req, res) => {
//     console.log('home product');
//     res.render('product/addProduct');
// });

// router.get('/test', (req, res) => {
//     res.render('home/test');
// });

// router.get('/ajax', (req, res) => {
//     res.render('test/ajax'), (err, out) => {
//         if (err) {
//             console.log(err);
//             res.send({ status: false });
//         } else {
//             res.send({
//                 status: true,
//                 htmlData: out,
//             });
//         }
//     };
// });


router.get('/product/Category/:id', productController.getProductByCategory);

//getAll product Ajax
router.get('/allproduct', homeController.getAllProduct);

//get user profile
router.get('/myProfile', auth.isUser, cartController.getUserProfile);

module.exports = router;