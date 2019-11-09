const cateDao = require('./../DAO/category_dao');
const productDao = require('./../DAO/product_dao');

const dao = new cateDao();
const pdao = new productDao();

exports.getAddCategoryIndex = async (req, res) => {
    res.render('category/addCat');
};

exports.insertCategory = async (req, res) => {
    try {
        console.log("posting new Category");
        const category = req.body;
        //console.log(category);
        req.checkBody('name', 'Category name is Required!').notEmpty();
        req.checkBody('description', 'Category description is Required!').notEmpty();
        var errors = req.validationErrors();
        var categories = await dao.getAllCategory();
        //console.log(errors);        
        if (errors.length > 0) {
            res.render('category/addCat', {
                errors,
                category
            });
        } else {
            errors = [];
            let status = await dao.getCategoryByName(category.name);
            //console.log(status);
            if (status != '') {
                errors.push({ msg: 'Category Name Already Exists' });
                res.render('category/addCat', {
                    errors,
                    category
                });
            } else {
                let saveCat = await dao.saveCategory(category);
                if (saveCat) {
                    //console.log('category saved');
                    req.flash(
                        'success_msg',
                        'Category have been added'
                    );
                    req.app.locals.gcate = await dao.getAllCategory();
                    res.redirect('/category');
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.updateCategory = async (req, res) => {
    console.log("updating new Category");
    try {
        var msg = '';
        btnstatus='edit';
        const id = req.params.id;
        var category = ({ id: id, name: req.body.name, description: req.body.description,status:'edit' });
        console.log(category);
        var editFlag = false;
        req.checkBody('name', 'Category name is Required!').notEmpty();
        req.checkBody('description', 'Category description is Required!').notEmpty();
        var errors = req.validationErrors();
        var categories = await dao.getAllCategory();
        if (errors.length > 0) {
            res.render('category/categoryIndex', {
                btnstatus,
                errors,
                category,
                categories
            });
        } else {
            let errors = [];
            let cateByName = await dao.getCategoryByName(category.name);
            if (cateByName == "") {
                editFlag = true;
                msg = 'New Product';
            } else {
                let oldCategory = await dao.getCategoryByid(category.id);
                if (oldCategory == "") {
                    editFlag = false;
                    msg = `Product Doesn't exist`;
                }
                else {
                    if (oldCategory.name == category.name) {
                        editFlag = true;
                        msg = 'same Product';
                    } else {
                        msg = 'name its another name';
                        editFlag = false;
                    }
                }
            }
           // console.log(`---------${msg}--------${editFlag}---`);
            if (!editFlag) {
                errors.push({ msg: `${msg}` });
                res.render('category/categoryIndex', {
                    btnstatus,
                    errors,
                    category,
                    categories
                });
            } else {
                let updateCategory = await dao.updateCategory(category);
               // console.log(updateCategory);                
                if (updateCategory != "") {
                    req.flash(
                        'success_msg',
                        'Category have been Updated'
                    );
                    req.app.locals.gcate = await dao.getAllCategory();
                    res.redirect('/category/');
                } else {
                    errors.push({ msg: 'Error updating Category !' });
                    res.render('category/categoryIndex', {
                        btnstatus,
                        errors,
                        category,
                        categories
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        var btnstatus='delete';
        console.log(req.params.id);       
        let product = await pdao.getProductByCategoryId(req.params.id,'none');
        
        if (product.length == 0) {
            let status = await dao.deleteCategory(req.params.id);
            if (status) {
                let categories = await dao.getAllCategory();
                req.flash(
                    'success_msg',
                    `Category of ID = ${req.params.id} have been delete`
                );
                res.redirect('/category');
                req.app.locals.gcate = await dao.getAllCategory();
            } else {
                req.flash(
                    'error_msg',
                    `Unable to delet Category of ID = ${req.params.id}`
                );
                res.redirect('/category');
            }
        } else {
            req.flash(
                'error_msg',
                `Some Product is related to category of id ${req.params.id}`
            );
            res.redirect('/category');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.categoryIndex = async (req, res) => {
    try {
        let categories = await dao.getAllCategory();
        res.render('category/categoryIndex', { categories, layout: 'layout/adminlayout' });
    } catch (error) {
        console.log(error);
    }
};

//ajax call
exports.ajaxAddCategory = async (req, res) => {
    try {
        console.log("posting new Category");
        const category = req.body;
        console.log(category);
        req.checkBody('name', 'Category name is Required!').notEmpty();
        req.checkBody('description', 'Category description is Required!').notEmpty();
        var errors = req.validationErrors();
        var categories = await dao.getAllCategory();
        if (errors.length > 0) {
            res.render('category/categoryIndex', {
                errors,
                category,
                categories
            });
        } else {
            let cateStatus = await dao.getCategoryByName(category.name);
            console.log(cateStatus);
            if (cateStatus != '') {
                errors.push({ msg: 'Category Name Already Exists' });
                res.render('category/addCat', {
                    errors,
                    categories,
                    category
                });
            } else {
                let saveCat = await dao.saveCategory(category);
                if (saveCat) {
                    console.log('category saved');
                    req.flash(
                        'success_msg',
                        'Category have been added'
                    );
                    req.app.locals.gcate = await dao.getAllCategory();
                    res.redirect('/category');
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};


exports.ajaxUpdateCategory = async (req, res) => {
    let categories = await dao.getAllCategory();
    console.log("updating new Category");
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    //console.log(req.body); //ok
    let errors = [];
    if (!name || !description) {
        errors.push({ msg: 'Please Fill up all Fields' });
    }
    if (errors.length > 0) {
        res.render('category/categoryIndex', {
            errors,
            name,
            description,
            categories,
            layout: 'layout/adminLayout'
        });
    } else {
        try {
            let category = await dao.getCategoryByid(id);
            console.log('Get Cateogry part');
            console.log(category);
            if (category) {
                console.log('logger from update Controller');
                let saveTodo = await dao.updateCategory(name, description, id);
                if (saveTodo) {
                    console.log('category saved');
                    req.flash(
                        'success_msg',
                        'Category have been Updated'
                    );
                    req.app.locals.gcate = await dao.getAllCategory();
                    res.redirect('/category/');
                }
            }
        } catch (error) {
            console.log(error);

        }
    }

};