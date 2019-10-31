const con = require("./../helpers/dbConnection");
const productDao = require("./../DAO/product_dao");
const categoryDao = require("./../DAO/category_dao");
const pdao = new productDao();
const cdao = new categoryDao();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const deleteFile = promisify(fs.unlink);
const removeDir = promisify(fs.remove);



//readdir

var cDate = require("./../helpers/getDate");
var imageUpload = require("./../helpers/imageUpload");
exports.getProductIndex = async(req, res) => {
    try {
        console.log(cDate.getDate(new Date()));
        const dao = new productDao();
        console.log("Product Index1==========");
        ///console.log(req.gcate);
        let gproduct = await pdao.getAllProduct();
        console.log("Get all Product");
        //console.log(gproduct);
        res.render("product/productIndex", {
            layout: "layout/adminLayout",
            gproduct
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getProductAdd = async(req, res) => {
    let catDao = new categoryDao();
    let categories = await cdao.getAllCategory();
    //console.log(categories);
    //console.log('Product Add Index');
    res.render("product/addProduct", {
        layout: "layout/adminLayout",
        categories
    });
};

exports.saveProduct = async(req, res) => {
    console.log("Posting new Product");
    try {
        const product = req.body;
        console.log(product);
        let errors = [];
        if (false) {
            errors.push({ msg: "Please Select all Value" });
        }
        if (errors.length > 0) {
            res.render("product/addProduct", {
                errors,
                product
            });
        } else {
            let oldProduct = await pdao.getProductbyName(product.name);
            if (oldProduct != "") {
                errors.push({ msg: "Product Name Already Exists" });
                res.render("product/addProduct", {
                    errors,
                    product
                });
            } else {
                let newProduct = await pdao.saveProduct(product);
                if (newProduct) {
                    console.log(`Product named ${product.name} save`);
                    console.log(newProduct);
                    newProduct = JSON.parse(JSON.stringify(newProduct));
                    console.log("after JSON");
                    console.log(newProduct);

                    //to store product image
                    mkdirp("public/product_images/" + newProduct.insertId, function(err) {
                        if (err) return console.log(err);
                    });

                    //gallery
                    //original image
                    mkdirp(
                        "public/product_images/" + newProduct.insertId + "/gallery",
                        function(err) {
                            if (err) return console.log(err);
                        }
                    );

                    //thumbs
                    mkdirp(
                        "public/product_images/" + newProduct.insertId + "/thumbs",
                        function(err) {
                            if (err) return console.log(err);
                        }
                    );
                    //Image Uploading Part
                    var imageFile =
                        typeof req.files.img !== "undefined" ? req.files.img : "";
                    let upload = await imageUpload(imageFile, newProduct.insertId);
                    console.log("Photo Uploaded");
                    req.flash(
                        "success_msg",
                        `Product named ${product.name}  have been added`
                    );
                    req.app.locals.gProduct = await pdao.getAllProduct();
                    console.log(req.app.locals.gProduct);
                    res.redirect("/product");
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
        let product = await pdao.getProductById(req.params.id);
        category = await cdao.getCategoryByid(product.categoryID);
        var galleryDir = "public/product_images/" + product.id + "/gallery";
        fs.readdir(galleryDir, function(err, files) {
            if (err) {
                console.log(err);
            } else {
                galleryImages = files;
                res.render("product/viewProduct", {
                    category,
                    product,
                    galleryImages,
                    layout: "layout/adminlayout"
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllCategory = async(req, res) => {
    try {
        console.log("Category Index");
        let categories = await dao.getAllCategory();
        res.render("category/categoryIndex", {
            categories,
            layout: "layout/adminlayout"
        });
    } catch (error) {
        console.log(error);
    }
};

//Get Product By Id for Updating

exports.getUpdateProduct = async(req, res) => {
    try {
        console.log(req.params.id);
        let product = await pdao.getProductById(req.params.id);
        if (product != "") {
            // // console.log(product);
            // product = await product.reduce(item => {
            //     return item.categoryID;
            // });
            category = await cdao.getCategoryByid(product.categoryID);
            if (category != "") {
                category = await category.reduce(item => {
                    return item;
                });
                // console.log(category);
                var rootDir = "public/product_images/" + product.id + '/';
                let defImage = rootDir + 'default.jpg';
                console.log(defImage);

                let galleryImages = await readDir(rootDir + 'gallery');
                let thumbsImages = await readDir(rootDir + 'thumbs');
                let images = [defImage, galleryImages, thumbsImages];

                // console.log('def images');
                // console.log(defImage);

                // console.log('Gallery Iamges');
                // console.log(galleryImages.length);

                // console.log('Product');
                // console.log(product);

                res.render('product/editProduct', { 'layout': 'layout/adminLayout', product, images });
                console.log('Product Edit Page render');
            }
        } else {
            console.log(product);
        }
    } catch (error) {
        console.log(error);
    }
};

exports.postUpdateProduct = async(req, res) => {
    try {
        let id = req.params.id;
        console.log("Updating Product");
        let editFlag = false;
        const formProduct = req.body; // product with body value
        let originalProduct = await pdao.getProductById(id); //original product by product id
        let existingProduct = await pdao.getProductbyName(formProduct.name); // product by name to check dulicate
        console.log(existingProduct);
        if (existingProduct == "") {
            console.log('its new name');
            editFlag = true;
        } else {
            existingProduct = await existingProduct.reduce(item => {
                return item;
            });
            console.log(existingProduct);
            console.log(originalProduct);
            console.log(formProduct);
            if (formProduct.name == originalProduct.name) {
                console.log('its same name');
                editFlag = true;
            } else {
                console.log('its another item name');
                editFlag = false;
            }
        }
        console.log(editFlag);
        if (editFlag) {
            console.log(req.files)
            console.log('Updating Part');
            if (req.files == null) {
                console.log('no image')
            } else {
                console.log(req.files.defaultimg);
                let defaultImage = req.files.defaultimg;
                let path = `public/product_images/${id}/default.jpg`;
                let imgUpload = await defaultImage.mv(path);
                console.log(imgUpload);
                req.flash('success_msg', 'Product have been updated');
                res.redirect('/product/');
                console.log("updating default image");
            }

            let productStatus = await pdao.updateProduct(formProduct, 'default.jpg', id);
            console.log(productStatus.affectedRows);
            if (productStatus.affectedRows != 0) {
                console.log('updated');
            }

            console.log('Product Updating finish ');



        } else {
            console.log(`error message1`);
        }

    } catch (error) {
        console.log(error);
    }
};

exports.updateGallery = async(req, res) => {
    console.log('Upating Gallery...');
    try {
        console.log(req.files.img.name);
        res.send(req.files.img.name);
        console.log('Upating Gallery Done...');
    } catch (error) {
        console.log(error);
    }
};

exports.deleteImage = async(req, res) => {
    try {
        let id = req.query.id;
        let image = req.params.image;
        let thumbsPath = `public/product_images/${id}/thumbs/${image}`;
        let galleryPath = `public/product_images/${id}/gallery/${image}`;
        let status = await deleteFile(galleryPath);
        let thumbStatus = await deleteFile(thumbsPath);
        console.log(id);
        console.log(thumbsPath);
        req.flash(
            'success_msg',
            `Gallery Image Deleted`
        );
        res.redirect(`/product/edit/${id}`);
    } catch (error) {
        console.log(error);
    }
};


exports.deleteProduct = async(req, res) => {
    console.log('deleting from here');
    try {
        let id = req.params.id;
        let productStatus = await pdao.getProductById(id);
        console.log('gett by id');
        console.log(productStatus);
        if (productStatus.length != 0) {
            let status = await pdao.deleteproduct(id);
            console.log(status);
            if (status.affectedRows != 0) {
                var path = 'public/product_images/' + id;
                let dirStatus = await removeDir(path);
                if (dirStatus) {
                    console.log(dirStatus);
                }
                req.flash(
                    'success_msg',
                    `Product of ID = ${req.params.id} have been delete`
                );
                gProduct = await pdao.getAllProduct();
                res.redirect('/product');
            } else {
                req.flash(
                    'error_msg',
                    `Unable to delete Product of ID = ${req.params.id}`
                );
                res.redirect('/product');
            }
        } else {
            req.flash(
                'error_msg',
                `no Product with id ${req.params.id} found `);
            res.redirect('/product');
        }
    } catch (error) {
        console.log(error);
    }
};

//ajax call for partil for category
exports.getProductByCategory = async(req, res) => {
    try {
        var products;
        console.log('*****************************************');
        id = req.params.id;
        name = req.query.name;
        sort = req.query.sortby;
        console.log(req.params.id);
        console.log(req.query.name);
        console.log(req.query.sortby);
        category = { id, name };

        if (sort == 'none') {
            products = await pdao.getProductByCategoryId(req.params.id, sort);
            console.log('wo sorting');
            sort = "undefined"
        } else if (sort == 'price') {
            console.log('sort by price');
            products = await pdao.getProductByCategoryId(req.params.id, sort);
        } else if (sort == 'price') {
            console.log('sort by price');
            products = await pdao.getProductByCategoryId(req.params.id, sort);
        } else {
            products = await pdao.getProductByCategoryId(req.params.id, sort);
            console.log('wo sorting');
        }
        console.log('***************Result**************************');
        console.log(products);

        res.render('pagePartials/categoryProductpartials', { products, category, sort },
            (err, out) => {
                //console.log("************For partials AJAX View", out);
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
};

exports.getAllProductAjax = async(req, res) => {
    try {
        let products = await pdao.getAllProduct();
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};

exports.getByCategory = async(req, res) => {
    try {
        let products = await pdao.getProductByCategoryId(20);
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};