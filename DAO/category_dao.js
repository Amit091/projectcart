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
        console.log('Get Category By ID');
        try {
            con = await gcon();
            let category = await con.query(query.select_cat_byid, [id]);
            category = await JSON.parse(JSON.stringify(category));
            return category;
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
            return category;
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

    async updateCategory(name, description, id) {
        try {
            console.log(description);
            console.log(id);
            console.log('logger from update part');
            let con = await gcon();
            let updatedCategory = await con.query(query.update_cat, [name, description, id]);
            console.log(updatedCategory);
            console.log('leavng update part');
            return true;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
};