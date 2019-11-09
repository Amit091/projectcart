const productController = require('./../controller/productController');
const productDAO = require('./../DAO/product_dao');
const pdao = new productDAO();

exports.getHomePage = async(req, res) => {
    res.render('home/home');
};

exports.getAllProduct = async(req, res) => {
    try {
        var products;
        console.log('**************************************************');
        var sort = req.query.sortby;
        if (sort == 'none') {
            products = await pdao.getProduct(sort);
            sort = "undefined";
        } else if (sort == 'price') {
            products = await pdao.getProduct(sort);
        } else if (sort == 'price') {
            products = await pdao.getProduct(sort);
        } else if (sort == 'category') {
            products = await pdao.getProduct(sort);
        } else {
            products = await pdao.getProduct(sort);
        }
        //console.log(products);

        res.render('pagePartials/homeProductPartials', { products, sort },
            (err, out) => {
                console.log("************For partials AJAX View");
                if (err) {
                    console.log(err);
                    res.send({ status: false });
                } else {
                    res.send({ htmlData: out, status: true });
                }
            });
    } catch (error) {
        console.log(error);
    }
};