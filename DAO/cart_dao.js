const gcon = require('../helpers/dbConnection');
const query = require('../helpers/queries/cart_query');
var con;
module.exports = class Category {

    //Create Category 
    async insertCategory(entity) {
        con = await gcon();
        try {
            let newCart = await con.query(query.insert_cart_item, [entity.user_id, entity.product_id, new Date()]);
            return true;
            //return status
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    //Read Category all
    async getAllCart() {
        try {
            con = await gcon();
            let cart_items = await con.query(query.read_cart_item);
            cart_items = JSON.parse(JSON.stringify(cart_items));
            return cart_items;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Read Category all by id
    async getCartItemByUser(userId) {
        console.log('Get Cart  By UserID' + userId);
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_by_userid, [userId]);
            cart = await JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Read Category all by name
    async getCartByuserIdandStatus(uid) {
        console.log('Get Cart  By UserID and status');
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_full_detail_product_and_category, [uid]);
            cart = JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Delete Category by id
    async deleteCart(id) {
        try {
            con = await gcon();
            let cart = await con.query(query.delete_cart, [id]);
            cart = JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async updateCartItem(data) {
        try {
            console.log('dao from update part');
            let con = await gcon();
            let updatedCart = await con.query(query.update_cart, [data.quan, data.id, data.user]);
            updatedCart = JSON.parse(JSON.stringify(updatedCart));
            console.log(updatedCart);
            return updatedCart;
        } catch (error) {
            console.log(error);
        } finally {
            await con.end();
        }
    }

    //Read cart deatil bu user id and product id with status on cart
    async getCheckIfItemExists(data) {
        console.log('Get Cart  By UserID product_id and status');
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_item_Product_by_user, [data.user_id, data.product_id]);
            cart = JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }


    //get full cart detail
    async getFullCartDetailOfUser(userId) {
        console.log('Get Cart  By UserID' + userId);
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_full_detail_product_and_category, [userId]);
            cart = await JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //get cart item detail by id
    async getCartItemByCartId(id) {
        console.log('Get Cart  By UserID product_id and status');
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_detail_by_cart_id, [id]);
            cart = JSON.parse(JSON.stringify(cart));
            console.log('here in dao for cart item by cart id');
            console.log(cart);
            cart = cart.reduce(item => {
                return item;
            })
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async getCartItemRemove(data) {
        console.log('Get Cart  By UserID product_id and status');
        try {
            con = await gcon();
            let cart = await con.query(query.delete_cart_by_user_id_and_cart_id, [data.id, data.user]);
            cart = JSON.parse(JSON.stringify(cart));
            console.log('delete in dao for cart item by cart id');
            console.log(cart);
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    //Read Category all by id
    async getCartByUser(userId) {
        console.log('Get Cart  By UserID' + userId);
        try {
            con = await gcon();
            let cart = await con.query(query.select_cart_full_detail_product_and_category_all, [userId]);
            cart = await JSON.parse(JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
};