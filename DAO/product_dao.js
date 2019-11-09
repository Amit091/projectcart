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
        try {
            con = await gcon();
            let product = await con.query(query.select_product_by_id, [id]);
            product = await JSON.parse(JSON.stringify(product));
            if (product.length != 0) {
                product = await product.reduce(item => {
                    return item;
                });
                return product;
            } else {
                return product;
            }
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

    async getProductByCategoryId(id, status) {
        try {
            con = await gcon();
            var products;
            if (status == "none") {
                //console.log(status + "via sort none");
                products = await con.query(query.select_product_by_category_id, [id]);
            } else if (status == "price") {
                //console.log(status + "via sort price");
                products = await con.query(query.select_product_by_category_id_order_by_price, [id]);
            } else if (status == "alpha") {
                //console.log(status + "via sort alpha");
                products = await con.query(query.select_product_by_category_id_order_by_name, [id]);
            }
            products = await JSON.parse(JSON.stringify(products));            
            return products;
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



    async getProduct(status) {
        try {
            con = await gcon();
            var products;
            if (status == "none") {
                console.log(status + "via sort none");
                products = await con.query(query.read_product);
            } else if (status == "price") {
                console.log(status + "via sort price");
                products = await con.query(query.select_product_order_by_price);
            } else if (status == "alpha") {
                console.log(status + "via sort alpha");
                products = await con.query(query.select_product_order_by_name);
            } else if (status == "category") {
                console.log(status + "via sort category");
                products = await con.query(query.select_product_order_by_category);
            }
            products = await JSON.parse(JSON.stringify(products));
            return products;
        } catch (error) {
            console.log(error);
        }
    }

};