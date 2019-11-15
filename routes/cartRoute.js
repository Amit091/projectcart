const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
const cartController = require('./../controller/cartController');

router.get('/', auth.isUser, cartController.getMyCart);

router.post('/add2Cart/:id', auth.isUser, cartController.ajaxAdd2Cart);

router.get('/cartitem/:id', auth.isUser, cartController.ajaxgetCartItem);

router.post('/updateItem/:id', auth.isUser, cartController.updateCartItem);

router.post('/deleteItem/:id', auth.isUser, cartController.removeCartItem);

module.exports = router;