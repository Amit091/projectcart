const gcon = require('./../helpers/dbConnection');
const query = require('./../helpers//queries/category_query');
module.exports = class Category {
    async saveCategory(entity) {


        let con = await gcon();
        try {
            let saveCategory = await con.query(query.insert_cat, [entity.name, entity.description]);
        } catch (error) {
            console.log(error);
        }
    }

}