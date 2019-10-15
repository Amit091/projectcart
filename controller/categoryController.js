const con = require('./../helpers/dbConnection');
const cateDao = require('./../DAO/category_dao');
const dao = new cateDao();


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
            description
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
                    description
                });
            } else {
                let saveTodo = await dao.saveCategory(cat);
                if (saveTodo) {
                    console.log('category saved');
                    req.flash(
                        'success_msg',
                        'Category have been added'
                    );
                    gcate = await dao.getAllCategory();
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
    const { name, description } = req.body;
    const oldCat = { id, name, description };
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
                const cat = { id, name, description };
                console.log(cat);
                console.log('logger from update Controller');
                let saveTodo = await dao.updateCategory(cat);
                if (saveTodo) {
                    console.log('category saved');
                    req.flash(
                        'success_msg',
                        'Category have been Updated'
                    );
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
        let status = await dao.deleteCategory(req.params.id);
        if (status) {
            let categories = await dao.getAllCategory();
            req.flash(
                'success_msg',
                `Category of ID = ${req.params.id} have been delete`
            );
            res.redirect('/category');
            gcate = await dao.getAllCategory();
        } else {
            req.flash(
                'error_msg',
                `Unable to delet Category of ID = ${req.params.id}`
            );
            res.redirect('/category');
        }
    } catch (error) {
        console.log(error);
    }
};




exports.getAllCategory = async(req, res) => {
    try {
        console.log('Category INdex');
        let categories = await dao.getAllCategory();
        res.render('category/categoryIndex', { categories, layout: 'layout/adminlayout' });
    } catch (error) {
        console.log(error);
    }
};