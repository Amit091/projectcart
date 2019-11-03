const express = require('express');
const router = express.Router();
const productController = require('./../controller/productController');
const productDAO = require('./../DAO/product_dao');
const pdao = new productDAO();

router.get('/', (req, res) => {
    res.render('home/home');
});

router.get('/product1', (req, res) => {
    console.log('home product');
    res.render('product/addProduct');
});

router.get('/test', (req, res) => {
    res.render('home/test');
});

router.get('/ajax', (req, res) => {
    res.render('test/ajax'), (err, out) => {
        if (err) {
            console.log(err);
            res.send({ status: false });
        } else {
            res.send({
                status: true,
                htmlData: out,
            });
        }
    };
});


router.get('/product/Category/:id', productController.getProductByCategory);

router.get('/allproduct', async(req, res) => {
    try {
        var products;
        console.log('**************************************************');
        var sort = req.query.sortby;
        if (sort == 'none') {
            products = await pdao.getProduct(sort);
            console.log('wo sorting' + sort);
            sort = "undefined";
        } else if (sort == 'price') {
            console.log('sort by price' + sort);
            products = await pdao.getProduct(sort);
        } else if (sort == 'price') {
            console.log('sort by price' + sort);
            products = await pdao.getProduct(sort);
        } else if (sort == 'category') {
            console.log('sort by price' + sort);
            products = await pdao.getProduct(sort);
        } else {
            products = await pdao.getProduct(sort);
            console.log('wo sorting' + sort);
        }
        console.log(products);

        res.render('pagePartials/homeProductPartials', { products, sort },
            (err, out) => {
                console.log("************For partials AJAX View");
                if (err) {
                    console.log(err);
                    res.send({ status: false });
                } else {
                    res.send({ htmlData: out, status: true });
                }
            });
    } catch (error) {
        console.log(error);
    }
});

router.get('/cart', async(req, res) => {
    res.render('home/usercart');
});

module.exports = router;