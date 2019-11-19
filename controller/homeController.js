const productController = require('./../controller/productController');
const productDAO = require('./../DAO/product_dao');
const pdao = new productDAO();
const categoryDao = require('./../DAO/category_dao');
const cdao = new  categoryDao();

exports.getHomePage = async (req, res) => {
    req.app.locals.gcate = await cdao.getAllCategory();        
    var perPage = 1;
    var page = req.params.page || 1;
    var offset = (perPage * page) - perPage;
    var count = (await pdao.getCount()).count;
    var pages = Math.ceil(count / perPage);
    console.log(count);

    console.log('****home page***');
    var data = {
        count,
        perPage,
        page,
        offset,
        pages
    };
    console.log(data);
    var result = await pdao.getlimitProduct(page,perPage);
    res.render('home/home',{result,data});
};

exports.getAllProduct = async (req, res) => {
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

exports.getPagination = async(req,res)=>{
    var perPage = 1   ;
    var page = req.params.id || 1;
    var offset = (perPage * page)-perPage;
    var count = (await pdao.getCount()).count;
    var pages = Math.ceil(count/perPage);
    
    console.log('*******');
    var data = {
      count,
      perPage,
      page,
      offset,
      pages
  };
  console.log(data);
    var products = await pdao.getlimitProduct(page,perPage);
    console.log(products);
    var sort = 'none';  
  res.render('pagePartials/paginationpartials',{products,data,sort});
  
  };