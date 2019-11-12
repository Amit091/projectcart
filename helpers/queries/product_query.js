module.exports = {
    //Create
    insert_product: `INSERT INTO tbl_product (name, price,categoryID,description,doa,imagepath) VALUE (?,?,?,?,?,?)`,
    //Read
    read_product: `SELECT * FROM tbl_product `,
    select_product_by_id: `SELECT * FROM tbl_product  WHERE id = ?`,
    select_product_by_name: `SELECT * FROM tbl_product  WHERE name = ?`,
    select_product_by_category_id: `SELECT * FROM tbl_product  WHERE categoryID = ?`,
    //Update
    update_product: `UPDATE tbl_product  SET 
    tbl_product.name = ?,tbl_product.price = ?,tbl_product.categoryID=?,tbl_product.description=?,tbl_product.imagepath=? WHERE tbl_product.id = ?`,
    //DELETE
    delete_product: `DELETE FROM tbl_product  WHERE id = ?`,
    delete_product_by_category: `DELETE * FROM tbl_product WHERE categoryID = ?`,
    select_product_by_category_id_order_by_price: `SELECT * FROM tbl_product  WHERE categoryID = ? ORDER BY price`,
    select_product_by_category_id_order_by_name: `SELECT * FROM tbl_product  WHERE categoryID = ? ORDER BY name`,
    //sort walla SQL
    select_product_order_by_price: `SELECT * FROM tbl_product ORDER BY price`,
    select_product_order_by_name: `SELECT * FROM tbl_product ORDER BY name`,
    select_product_order_by_category: `SELECT * FROM tbl_product  ORDER BY categoryID`,
    select_product_full_detail:`SELECT p.* , c.name as category FROM tbl_product AS p INNER JOIN tbl_category AS c WHERE p.categoryID = c.id ORDER BY p.id`
};