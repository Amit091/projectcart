const cartDAO = require('./../DAO/cart_dao');
// const categoryDAO = require('./../DAO/category_dao');
// const productDAO = require('./../DAO/product_dao');
const cartdao = new cartDAO();
// const catdao = new categoryDAO();
// const proddao = new productDAO();

const auth = require('./../middleware/auth');

exports.getMyCart = async(req, res) => {
    let id = req.query.id;
    try {
        if (id == "" && id == 'undefined') {
            res.redirect('/');
        } else {
            if (auth.isUser) {
                let cartitems = await cartdao.getFullCartDetailOfUser(id);
                console.log(cartitems);
                
                res.render('home/usercart', { id, cartitems });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.ajaxAdd2Cart = async(req, res) => {
    try {
        //also check the duplicate 
        // or already exists
        console.log(req.params.id);
        
        if (auth.isUser) {
            //console.log(req);
            var data = req.body;
            req.checkBody('product_id', 'No products here').notEmpty();
            req.checkBody('user_id', 'No User here').notEmpty();
            var errors = req.validationErrors();
            if (errors.length > 0) {
                res.status(400).send(errors);
            } else {
                console.log('getting cart from user name and id');
                let cartItem = await cartdao.getCheckIfItemExists(data);
                if (cartItem != "") {
                    msg = 'Item Already Added';
                    res.status(400).send({ msg });
                } else {
                    let newcart = await cartdao.insertCategory(data);
                    if (newcart) {
                        res.status(200).send({ msg: 'Item added to cart', code: 111 });
                    }
                }
            }
        } else {
            console.log('Unauthorized');
            res.status(401).send({ msg: 'UnAuthenticated' });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.ajaxgetCartItem = async(req, res) => {
    var id = req.query.id;
    var quan = req.query.quan;
    var errors = [];
    try {
        (id != 0) ? '' : errors.push({ msg: 'No cart of Respective Id' })
            (quan != 0) ? '' : errors.push({ msg: 'No Quantity' });
        console.log('cart here only one item');
        //also check the duplicate 
        // or already exists
        console.log('****/');
        req.checkBody('id', 'No id here').notEmpty();
        req.checkBody('quan', 'No quan here').notEmpty();
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            console.log('getting cart from cart id');
            let cartItem = await cartdao.getCartItemByCartId(id);
            console.log(cartItem.length);
            console.log(cartItem);
            if (cartItem == "") {
                msg = 'Item NOt Found';
                res.status(400).send({ msg });
            } else {
                //res.status(200).send(cartItem);
                res.render('pagePartials/itemPurchaseModal', { item: cartItem, quan },
                    (err, out) => {
                        console.log("************For partials AJAX View");
                        if (err) {
                            console.log(err);
                            res.send({ status: false });
                        } else {
                            res.send({ htmlData: out, status: true });
                        }
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.updateCartItem = async(req, res) => {
    console.log('updating the purchase item');
    var id = req.query.id;
    var errors = [];
    try {
        console.log(req.body);
        req.checkBody('id', 'No id here').notEmpty();
        req.checkBody('quan', 'No quan here').notEmpty();
        req.checkBody('user', 'No id here').notEmpty();
        (id != 0) ? '' : errors.push({ msg: 'No cart of Respective Id' });
        console.log('cart here only one item');
        //also check the duplicate 
        // or already exists
        console.log('****/');
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            console.log('getting cart from cart id');
            let cartItem = await cartdao.updateCartItem(req.body);
            console.log(cartItem);
            if (cartItem == "") {
                msg = 'Item NOt Found';
                res.status(400).send({ msg :'Item Not Found' });
            } else {
                res.send(200).status({ msg: "Item Remove After purchase" });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.removeCartItem = async(req, res) => {
    console.log('removing the purchase item');
    var id = req.query.id;
    var errors = [];
    try {
        console.log(req.body);
        req.checkBody('id', 'No id here').notEmpty();
        req.checkBody('user', 'No id here').notEmpty();
        (id != 0) ? '' : errors.push({ msg: 'No cart of Respective Id' });
        console.log('****/Removing Item');
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            console.log('deleting cartItem from cart id');
            let cartItem = await cartdao.getCartItemRemove(req.body);
            console.log(cartItem);
            if (cartItem == "") {
                msg = 'Item NOt Found';
                res.status(400).send({ msg });
            } else {
                res.send(200).status({ msg: "Item Remove from cart" });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getUserProfile = async(req,res)=>{
    try {
        let id =res.locals.user.id ;
        let cartitems = await cartdao.getCartByUser(id);
        res.render('admin/userProfile',{cartitems});
        
    } catch (err) {
        console.log(err);
    }
};