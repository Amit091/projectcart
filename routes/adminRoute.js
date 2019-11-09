const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');

const productDAO = require('./../DAO/product_dao');
const categoryDAO = require('./../DAO/category_dao');
const userDAO = require('./../DAO/user_dao');

const pdao = new productDAO();
const cdao = new categoryDAO();
const udao = new userDAO();


router.get('/', auth.isAdmin, async(req, res) => {
    try {
        let product = await pdao.getAllProduct();
        let category = await cdao.getAllCategory();
        let userAll = await udao.getAllUser();
        res.render('admin/index', { product, category, userAll });
    } catch (error) {
        console.log(error);
    }
});

router.get('/userList', auth.isAdmin, async(req, res) => {
    try {
        let userAll = await udao.getAllUser();
        res.render('admin/userList', { userAll });
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;