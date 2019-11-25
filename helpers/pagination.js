const productDAO = require('./../DAO/product_dao');
const pdao = new productDAO();
module.exports = async (currentPage)=>{
    const limit = 3   ;
    var page = currentPage || 1;
    var offset = (limit * page)-limit;
    var total = await pdao.getCount();
    var pages = Math.ceil(total/limit);
    var data = {
      total,
      limit,
      page,
      offset,
      pages
  };
  console.log('****paginate js***');
  console.log(data);
  
    console.log('****paginate js***');

  return data;
};