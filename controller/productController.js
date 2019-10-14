const con = require('./../helpers/dbConnection');
const productDao = require('./../DAO/product_dao');
const categoryDao = require('./../DAO/category_dao');
const pdao = new productDao();
const cdao = new categoryDao();
const mkdirp = require('mkdirp');
const fs = require('fs');

var cDate = require('./../helpers/getDate');
var imageUpload = require('./../helpers/imageUpload');
exports.getProductIndex = async(req, res) => {
    try {
        console.log(cDate.getDate(new Date()));
        const dao = await new productDao();
        console.log('Product Index1==========');
        ///console.log(req.gcate);
        let gproduct = await pdao.getAllProduct();
        console.log('Get all Product');
        //console.log(gproduct);
        res.render('product/productIndex', { layout: 'layout/adminLayout', gproduct });
    } catch (error) {
        console.log(error);
    }
};

exports.getProductAdd = async(req, res) => {
    let catDao = new categoryDao();
    let categories = await cdao.getAllCategory();
    //console.log(categories);
    //console.log('Product Add Index');
    res.render('product/addProduct', { layout: 'layout/adminLayout', categories });
};

exports.saveProduct = async(req, res) => {
    console.log('Posting new Product');
    try {
        const product = req.body;
        console.log(product);
        let errors = [];
        if (false) {
            errors.push({ msg: 'Please Select all Value' });
        }
        if (errors.length > 0) {
            res.render('product/addProduct', {
                errors,
                product
            });
        } else {
            let oldProduct = await pdao.getProductbyName(product.name);
            if (oldProduct != "") {
                errors.push({ msg: 'Product Name Already Exists' });
                res.render('product/addProduct', {
                    errors,
                    product
                });
            } else {
                let newProduct = await pdao.saveProduct(product);
                if (newProduct) {
                    console.log(`Product named ${product.name} save`);
                    console.log(newProduct);
                    newProduct = JSON.parse(JSON.stringify(newProduct));
                    console.log('after JSON');
                    console.log(newProduct);

                    //to store product image
                    mkdirp('public/product_images/' + newProduct.insertId, function(err) {
                        if (err) return console.log(err);
                    });

                    //gallery
                    //original image
                    mkdirp('public/product_images/' + newProduct.insertId + '/gallery', function(err) {
                        if (err) return console.log(err);
                    });

                    //thumbs
                    mkdirp('public/product_images/' + newProduct.insertId + '/thumbs', function(err) {
                        if (err) return console.log(err);
                    });
                    //Image Uploading Part
                    var imageFile = typeof req.files.img !== "undefined" ? req.files.img : "";
                    let upload = await imageUpload(imageFile, newProduct.insertId);
                    console.log('Photo Uploaded');
                    req.flash(
                        'success_msg',
                        `Product named ${product.name}  have been added`
                    );
                    //gcate = await dao.getAllCategory();
                    res.redirect('/product');
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllProduct = async(req, res) => {
    pdao.getAllProduct();
};

//Get Product By Id for Viewing
exports.getproductById = async(req, res) => {
    try {
        console.log(req.params.id);
        let product = await pdao.getProductById(req.params.id);
        product = await product.reduce((item) => {
            return item.categoryID;
        });
        category = await cdao.getCategoryByid(product.categoryID);
        category = await category.reduce((item) => {
            return item;
        });
        console.log(category);
        var galleryDir = 'public/product_images/' + product.id + '/gallery';
        fs.readdir(galleryDir, function(err, files) {
            if (err) {
                console.log(err);
            } else {
                galleryImages = files;
                res.render('product/viewProduct', {
                    category,
                    product,
                    galleryImages,
                    layout: 'layout/adminlayout'
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllCategory = async(req, res) => {
    try {
        console.log('Category Index');
        let categories = await dao.getAllCategory();
        res.render('category/categoryIndex', { categories, layout: 'layout/adminlayout' });
    } catch (error) {
        console.log(error);
    }
};

//Get Product By Id for Updating

exports.getUpdateProduct = async(req, res) => {
    try {
    console.log(req.params.id)
        var amit = ['dfdsfad', 1, 23123, 123123, ];
        console.log('editing product'+amit);
        res.render('product/editProduct', { 'layout': 'layout/adminlayout' });
        
        console.log(req.params.id);
        let product = await pdao.getProductById(req.params.id);
        product = await product.reduce((item) => {
            return item.categoryID;
        });
        category = await cdao.getCategoryByid(product.categoryID);
        category = await category.reduce((item) => {
            return item;
        });
        console.log(category);
        var galleryDir = 'public/product_images/' + product.id + '/gallery';
        fs.readdir(galleryDir, function(err, files) {
            if (err) {
                console.log(err);
            } else {
                galleryImages = files;
                res.render('product/viewProduct', {
                    category,
                    product,
                    galleryImages,
                    layout: 'layout/adminlayout'
                });
            }
        });
        // res.send(amit);
    } catch (error) {
        console.log(error);
    }
};

exports.updateProduct = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
    }
};