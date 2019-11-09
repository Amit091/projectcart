const gcon = require('./../helpers/dbConnection');
const query = require('./../helpers/queries/category_query');
var con;
module.exports = class Category {

    //Create Category 
    async saveCategory(entity) {
        con = await gcon();
        try {
            let saveCategory = await con.query(query.insert_cat, [entity.name, entity.description]);
            return true;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    //Read Category all
    async getAllCategory() {
        try {
            con = await gcon();
            let categories = await con.query(query.read_cat);
            categories = JSON.parse(JSON.stringify(categories));
            return categories;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Read Category all by id
    async getCategoryByid(id) {
        try {
            con = await gcon();
            let category = await con.query(query.select_cat_byid, [id]);
            category = await JSON.parse(JSON.stringify(category));
            category = (category.length != 0) ? await category.reduce(item => { return item }) : null;
            return (category != null) ? category : '';
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Read Category all by name
    async getCategoryByName(name) {
        try {
            con = await gcon();
            let category = await con.query(query.select_cat_byname, [name]);
            category = JSON.parse(JSON.stringify(category));
            category = (category.length != 0) ? await category.reduce(item => { return item }) : null;
            return (category != null) ? category : '';
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Delete Category by id
    async deleteCategory(id) {
        try {
            con = await gcon();
            let category = await con.query(query.delete_cat, [id]);
            category = JSON.parse(JSON.stringify(category));
            return true;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async updateCategory(category) {
        try {
            let con = await gcon();
            let result = await con.query(query.update_cat, [category.name, category.description, category.id]);
            result = JSON.parse(JSON.stringify(result));
            return (result.affectedRows != 0 && result.changedRows != 0) ? true : false;
        } catch (error) {
            console.log(error);
        }
    }
};