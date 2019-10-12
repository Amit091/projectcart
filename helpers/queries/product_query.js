module.exports = {
    //Create
    insert_product: `INSERT INTO tbl_product (name, price,categoryID,description,doa,imagepath) VALUE (?,?,?,?,?,?)`,
    //Read
    read_product: `SELECT * FROM tbl_product `,
    select_product_by_id: `SELECT * FROM tbl_product  WHERE id = ?`,
    select_product_by_name: `SELECT * FROM tbl_product  WHERE name = ?`,
    select_product_by_category: `SELECT * FROM tbl_product  WHERE categoryID = ?`,
    //Update
    update_product: `UPDATE tbl_product  SET 
    name = ?,description = ?,categoryID=?,imagepath=? WHERE id = ?`,
    //DELETE
    delete_product: `DELETE FROM tbl_product  WHERE id = ?`,
    delete_product_by_category: `DELETE * FROM tbl_product WHERE categoryID = ?`
};