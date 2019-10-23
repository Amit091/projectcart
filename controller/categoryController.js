const con = require('./../helpers/dbConnection');
const cateDao = require('./../DAO/category_dao');
const productDao = require('./../DAO/product_dao');

const dao = new cateDao();
const pdao = new productDao();

exports.getAddCategoryIndex = async(req, res) => {
    res.render('category/addCat', { 'layout': 'layout/adminLayout' });
};

exports.insertCategory = async(req, res) => {
    console.log("posting new Category");
    const { name, description } = req.body;
    const cat = { name, description };
    console.log('loggr cat');

    console.log(cat);
    let errors = [];
    if (!name || !description) {
        errors.push({ msg: 'Please Fill up all Fields' });
    }
    if (errors.length > 0) {
        res.render('category/addCat', {
            errors,
            name,
            description,
            layout: 'layout/adminLayout'
        });
    } else {
        try {
            let category = await dao.getCategoryByName(name);
            console.log(category);
            if (category != '') {
                errors.push({ msg: 'Category Name Already Exists' });
                res.render('category/addCat', {
                    errors,
                    name,
                    description,
                    layout: 'layout/adminLayout'
                });
            } else {
                let saveCat = await dao.saveCategory(cat);
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
        } catch (error) {
            console.log(error);
        }
    }
};

exports.updateCategory = async(req, res) => {
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

exports.deleteCategory = async(req, res) => {
    try {
        let product = await pdao.getProductByCategoryId(req.params.id);
        if (product == "") {
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

exports.getAllCategory = async(req, res) => {
    try {
        console.log('Category Index');
        let categories = await dao.getAllCategory();
        res.render('category/categoryIndex', { categories, layout: 'layout/adminlayout' });
    } catch (error) {
        console.log(error);
    }
};