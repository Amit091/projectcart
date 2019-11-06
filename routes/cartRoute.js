const express = require('express');
const router = express.Router();
const cartDAO = require('./../DAO/cart_dao');
const categoryDAO = require('./../DAO/category_dao');
const productDAO = require('./../DAO/product_dao');
const cartdao = new cartDAO();
const catdao = new categoryDAO();
const proddao = new productDAO();
const auth = require('./../middleware/auth');

router.get('/', auth.isUser, async(req, res) => {
    let id = req.query.id;
    console.log(id);
    try {
        if (id == "" && id == 'undefined') {
            res.redirect('/');
        } else {

            if (auth.isUser) {
                let cartitems = await cartdao.getFullCartDetailOfUser(id);
                // console.log('**************');
                // console.log(cartitems);
                res.render('home/usercart', { id, cartitems });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/add2Cart', auth.isUser, async(req, res) => {
    try {
        console.log('cart herer');
        //also check the duplicate 
        // or already exists
        if (auth.isUser) {
            console.log(req.body);
            var data = req.body;
            req.checkBody('product_id', 'No products here').notEmpty();
            req.checkBody('user_id', 'No User here').notEmpty();
            var errors = req.validationErrors();
            if (errors.length > 0) {
                res.sendStatus(400).send(errors);
            } else {
                console.log('getting cart from user name and id');
                let cartItem = await cartdao.getCheckIfItemExists(data);
                console.log(cartItem.length);
                console.log(cartItem);

                if (cartItem != "") {
                    //item  already exists
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
        // res.sendStatus(400).json({ msg: 'done' });
    }
});

router.get('/cartitem/:id', async(req, res) => {
    var id = req.query.id;
    var quan = req.query.quan;
    var errors = [];
    try {
        (id != 0) ? '' : errors.push({ msg: 'No cart of Respective Id' });
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
        // res.sendStatus(400).json({ msg: 'done' });
    }
});


router.post('/updateItem/:id', async(req, res) => {
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
                res.status(400).send({ msg });
            } else {
                res.send(200).status({ msg: "Item Remove Afte purchase" })
            }
        }

    } catch (error) {
        console.log(error);
        // res.sendStatus(400).json({ msg: 'done' });
    }
});

router.post('/deleteItem/:id', async(req, res) => {
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
        // res.sendStatus(400).json({ msg: 'done' });
    }
});

module.exports = router;