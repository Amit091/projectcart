const gcon = require('./../helpers/dbConnection');
const query = require('./../helpers/queries/product_query');
var con;
var cDate = require('./../helpers/getDate');


module.exports = class productSQL {

    async saveProduct(product) {
        con = await gcon();
        try {
            let savedproduct = await con.query(query.insert_product, [product.name, product.price, product.category, product.description, cDate.getDate(new Date()), 'default.jpg']);
            return savedproduct;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    async getAllProduct() {
        try {
            con = await gcon();
            let products = await con.query(query.read_product);
            products = await JSON.parse(JSON.stringify(products));
            return products;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async getProductById(id) {
        console.log('get all Product by id:' + id);
        try {
            con = await gcon();
            let product = await con.query(query.select_product_by_id, [id]);
            product = await JSON.parse(JSON.stringify(product));
            product = await product.reduce(item => {
                return item;
            });
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    async getProductbyName(name) {
        console.log('get all Product by name' + name);
        try {
            con = await gcon();
            let product = await con.query(query.select_product_by_name, [name]);
            product = await JSON.parse(JSON.stringify(product));
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async getProductByCategoryId(id) {
        try {
            con = await gcon();
            let product = await con.query(query.select_product_by_category_id, [id]);
            product = await JSON.parse(JSON.stringify(product));
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(formProduct, img, id) {
        try {
            con = await gcon();
            let status = await con.query(query.update_product, [formProduct.name, formProduct.price, formProduct.category, formProduct.description, img, id]);
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteproduct(id) {
        try {
            con = await gcon();
            let product = await con.query(query.delete_product, [id]);
            product = await JSON.parse(JSON.stringify(product));
            return product;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async deleteProductByCategory() {
        console.log('delete all Product of category');
    }

    async updateProductGallery() {
        try {

        } catch (error) {

        }
    }

};