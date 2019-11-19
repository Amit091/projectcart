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
exports.getProductIndex = async (req, res) => {
    try {
        console.log(cDate.getDate(new Date()));
        const dao = new productDao();
        console.log("Product Index1==========");
        ///console.log(req.gcate);
        let gproduct = await pdao.getAllProduct();
        console.log("Get all Product");
        //console.log(gproduct);
        res.render("product/productIndex", {
            gproduct
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getProductAdd = async (req, res) => {
    let catDao = new categoryDao();
    let categories = await cdao.getAllCategory();
    //console.log(categories);
    //console.log('Product Add Index');
    res.render("product/addProduct", {
        layout: "layout/adminLayout",
        categories
    });
};

exports.saveProduct = async (req, res) => {
    try {
        console.log("Posting new Product");
        //checking the validation
        req.checkBody('name', 'Name is required!').notEmpty();
        req.checkBody('category', 'Caregory is  required!').notEmpty();
        req.checkBody('price', 'Price is required!').notEmpty();
        req.checkBody('price', 'Price must integer!').isNumeric();
        req.checkBody('description', 'Description is Empty!').notEmpty();

        var defaultImg, galleryImg;
        var errors = req.validationErrors();
        if (req.files != null) {
            if (typeof req.files.defaultimg != "undefined") {
                defaultImg = req.files.defaultimg;
                // req.checkBody('defaultimg', 'You must upload an Valid Image').isImage(defaultImg);
            } else {
                defaultImg = '';
                errors.push({ param: 'Default Image', msg: 'Upload Default Image!' });
            }
            if (typeof req.files.galleryimg != "undefined") {
                galleryImg = req.files.galleryimg;
            } else {
                galleryImg = '';
                errors.push({ param: 'Gallery Image', msg: 'Upload  \n Atleast a single Image!' });
            }
        } else {
            errors.push({ param: 'Default Image', msg: 'Upload Default Image!' });
            errors.push({ param: 'Gallery Image', msg: 'Upload Gallery!' });
        }
        console.log(errors);
        const product = req.body;
        console.log(product);
        //executing the main insert part
        if (errors.length > 0) {
            res.render("product/addProduct", {
                errors,
                product
            });
        } else {
            errors = [];
            let oldProduct = await pdao.getProductbyName(product.name);
            if (oldProduct != "") {
                errors.push({ param: 'name', msg: "Product Name Already Exists" });
                res.render("product/addProduct", {
                    errors,
                    product
                });
            } else {
                let newProduct = await pdao.saveProduct(product);
                if (newProduct) {
                    console.log(`Product named ${product.name} save`);
                    newProduct = JSON.parse(JSON.stringify(newProduct));

                    //creating seprate directory
                    //to store product image
                    mkdirp("public/product_images/" + newProduct.insertId, function (err) {
                        if (err) return console.log(err);
                    });

                    //gallery
                    //original image
                    mkdirp(
                        "public/product_images/" + newProduct.insertId + "/gallery",
                        function (err) {
                            if (err) return console.log(err);
                        }
                    );

                    //thumbs
                    mkdirp(
                        "public/product_images/" + newProduct.insertId + "/thumbs",
                        function (err) {
                            if (err) return console.log(err);
                        }
                    );
                    // uploading default image
                    let defaultImage = typeof req.files.defaultimg != "undefined" ? req.files.defaultimg : "";
                    let uploadDefault = await imageUpload(defaultImage, newProduct.insertId, 'default');

                    //gallery Image Uploading Part
                    var imageFile =
                        typeof req.files.galleryimg !== "undefined" ? req.files.galleryimg : "";
                    let upload2 = await imageUpload(imageFile, newProduct.insertId, 'gallery');
                    console.log("Photo Uploaded");
                    req.flash(
                        "success_msg",
                        `Product named ${product.name}  have been added`
                    );
                    req.app.locals.gProduct = await pdao.getAllProduct();
                    //console.log(req.app.locals.gProduct);
                    res.redirect("/product");
                }

            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllProduct = async (req, res) => {
    pdao.getAllProduct();
};

//Get Product By Id for Viewing
exports.getproductById = async (req, res) => {
    try {
        let state = await checkItemExits(req.params.id);
        if (state) {
            let product = await pdao.getProductById(req.params.id);
            category = await cdao.getCategoryByid(product.categoryID);
            var galleryDir = "public/product_images/" + product.id + "/gallery";
            let status = await readDir(galleryDir);
            if (status == "") {
                console.log('no Image');
            }
            galleryImages = status;
            res.render("product/viewProduct", {
                category,
                product,
                galleryImages,
            });
        } else {
            req.flash('error_msg', 'Product not found');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllCategory = async (req, res) => {
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
exports.getUpdateProduct = async (req, res) => {
    try {
        let product = await pdao.getProductById(req.params.id);
        category = await cdao.getCategoryByid(product.categoryID);
        var galleryDir = "public/product_images/" + product.id + "/gallery";
        let status = await readDir(galleryDir);
        if (status == "") {
            console.log('no image');
        }
        galleryImages = status;
        res.render("product/editProduct", {
            category,
            product,
            galleryImages,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postUpdateProduct = async (req, res) => {
    try {
        console.log("Updating Product");
        let id = req.params.id;
        //checking the validation
        req.checkBody('name', 'Name is required!').notEmpty();
        req.checkBody('category', 'Select Category !').notEmpty();
        req.checkBody('price', 'Price is required!').notEmpty();
        req.checkBody('price', 'Price must integer!').isNumeric();
        req.checkBody('description', 'Description is Empty!').notEmpty();
        var custerrors = [];
        var defaultImg, galleryImg;
        var error = req.validationErrors();
        //console.log(errors);
        if (req.files != null) {
            if (typeof req.files.defaultimg != "undefined") {
                defaultImg = req.files.defaultimg;
                console.log('*********************')
                console.log(defaultImg.mimetype)
                console.log((defaultImg.mimetype.split('/'))[1]);
                let mime = `.${((defaultImg.mimetype.split('/'))[1]).toString()}`;
                console.log(`image extension ${mime}`)
                // if (mime != '.jpg ' || mime != '.png ' || mime != '.jpeg ') {
                //     console.log('invalid extension');
                //     custerrors.push({ param: 'Default Image extension', msg: 'You must upload an Valid Image!' });
                // }
            } else {
                defaultImg = '';
                //errors.push({ param: 'Default Image', msg: 'Upload Default Image!' });
            }
        } else {
            defaultImg = '';
            //errors.push({ param: 'Default Image', msg: 'Upload Default Image!' });
        }
        errors = (!error) ? custerrors : custerrors.concat(error);
        //         errors = errors.concat(error);
        console.log(errors);
        var product = [];
        let formProduct = req.body;
        product = ({ id: id, name: formProduct.name, categoryID: formProduct.category, price: formProduct.price, description: formProduct.description });
        console.log(product);
        var galleryDir = "public/product_images/" + id + "/gallery";
        let status = await readDir(galleryDir);
        galleryImages = status;
        if (status == "") {
            console.log(err);
        }
        if (errors.length > 0) {
            res.render("product/editProduct", {
                errors,
                product,
                galleryImages,
            });
            errors = [];
        } else {
            let editFlag = false;
            let originalProduct = await pdao.getProductById(id); //original product by product id
            let existingProduct = await pdao.getProductbyName(formProduct.name); // product by name to check dulicate
            //console.log(existingProduct);
            //maintaining Edit Flag
            if (existingProduct == "") {
                console.log('its new name');
                editFlag = true;
            } else {
                console.log(existingProduct);
                //console.log(existingProduct);
                //console.log(originalProduct);
                // console.log(formProduct);
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
                console.log('Updating Part');
                // console.log(req.files.defaultimg);
                // let defaultImage = req.files.defaultimg;
                // let path = `public/product_images/${id}/default.jpg`;
                // let imgUpload = await defaultImage.mv(path);
                // uploading default image
                //let defaultImage = typeof req.files.defaultimg != "undefined" ? req.files.defaultimg : "";
                let productStatus = await pdao.updateProduct(formProduct, 'default.jpg', id);
                console.log(productStatus.affectedRows);
                if (productStatus.affectedRows != 0) {
                    console.log("updating default image");
                    let uploadDefault = (defaultImg != "") ? await imageUpload(defaultImg, id, 'default') : 'no change in DP';
                    console.log(uploadDefault);
                    console.log('Product Updating finish ');
                    req.app.locals.gProduct = await pdao.getAllProduct();
                    req.flash('success_msg', 'Product have been updated');
                    res.redirect('/product/');
                } else {
                    // errors.push({msg:'Error While Updating Product'})
                    // res.render("product/editProduct", {
                    //     errors,
                    //     product,
                    //     galleryImages,
                    // });
                    req.flash('warning_msg', 'Error While Updating Product !');
                    res.redirect('/product/edit' + id);
                }
            } else {
                req.flash('warning_msg', 'Error While Updating Product !');
                res.redirect('/product/edit/' + id);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

exports.updateGallery = async (req, res) => {
    console.log('Updating Gallery...');
    let id = req.params.id;
    console.log(req.files);
    try {
        if (req.files == null) {
            req.flash('errror_msg', 'No Iamge Selected');
            res.redirect('/product/edit/' + id + '/#productGalleryImage');
        } else {
            if (req.files.galleryimg != "") {
                let id = req.params.id;
                console.log(req.files.galleryimg);
                //Image Uploading Part
                var imageFile =
                    typeof req.files.galleryimg !== "undefined" ? req.files.galleryimg : "";
                let upload2 = await imageUpload(imageFile, id, 'gallery');
                console.log("Photo Uploaded");
                console.log('Upating Gallery Done...');
                res.redirect('/product/edit/' + id + '/#productGalleryImage');
            } else {
                req.flash('errror_msg', 'Invalid Entry');
                res.redirect('/product/edit/' + id + '/#productGalleryImage');
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.deleteImage = async (req, res) => {
    try {
        let path = `public/product_images/${req.params.image}/`;
        let galleryPath = `${path}gallery/${req.body.image_name}`;
        let thumbsPath = `${path}thumbs/${req.body.image_name}`;
        let galleryStatus = await readFile(galleryPath);
        let thumbsStatus = await readFile(thumbsPath);
        if (galleryStatus && thumbsStatus) {
            let gStatus = await deleteFile(galleryPath);
            let thStatus = await deleteFile(thumbsPath);
            res.send({ status: true, msg: 'Image Delete ' }).status(200);
        } else {
            res.send({ status: true, msg: 'Gallery Image Not Found' }).status(404);
        }
    } catch (error) {
        console.log(error);
        res.send({ status: false, msg: 'Gallery Image Not Found' }).status(404);
    }
};


exports.deleteProduct = async (req, res) => {
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
exports.getProductByCategory = async (req, res) => {
    try {
        var products;
        id = req.params.id;
        name = req.query.name;
        sort = req.query.sortby;
        category = { id, name };

        if (sort == 'none') {
            products = await pdao.getProductByCategoryId(req.params.id, sort);
            //console.log('wo sorting');
            sort = "undefined"
        } else if (sort == 'price') {
            //console.log('sort by price');
            products = await pdao.getProductByCategoryId(req.params.id, sort);
        } else if (sort == 'price') {
            //console.log('sort by price');
            products = await pdao.getProductByCategoryId(req.params.id, sort);
        } else {
            products = await pdao.getProductByCategoryId(req.params.id, sort);
            //console.log('wo sorting');
        }
        //console.log('***************Result**************************');
        //console.log(products);

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

exports.getAllProductAjax = async (req, res) => {
    try {
        let products = await pdao.getAllProduct();
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};

exports.getByCategory = async (req, res) => {
    try {
        let products = await pdao.getProductByCategoryId(20);
        res.send(products);
    } catch (error) {
        console.log(error);
    }
};

async function checkItemExits(id) {
    try {
        let product = await pdao.getProductById(id);
        product != "" ? console.log('Product Exists') : console.log('not exist');
        return product != "" ? true : false;
    } catch (error) {
        console.log(error);
    }
}