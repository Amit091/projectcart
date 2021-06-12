const productDAO = require('./../DAO/product_dao');
const pdao = new productDAO();
const categoryDao = require('./../DAO/category_dao');
const cdao = new  categoryDao();
const paginate = require('./../helpers/pagination');

exports.getHomePage = async (req, res) => {
    req.app.locals.gcate = await cdao.getAllCategory();   
    var page = req.params.page || 1;
    var data = await paginate(page);
    console.log(data);
    var products = await pdao.getlimitProduct(data.limit,data.offset);
    res.render('home/home',{products,data});
};


exports.getAllProduct = async (req, res) => {
    try {
        var gProduct;
        console.log('**********************Sorting****************************');
                
        var sort = req.query.sortby || 'none';
        gProduct = await pdao.getProduct(sort);
        res.render('partials/products', { gProduct, sort },
            (err, out) => {
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

exports.getPagination = async(req,res)=>{
    var page = req.params.page || 2;
    console.log(req.params);
    console.log('****aaaa***');
    var data = await paginate(page);
    var products = await pdao.getlimitProduct(data.limit,data.offset);
    var sort = 'none';  
    res.render('pagePartials/paginationpartials',{products,data,sort});  
  };