module.exports = {
    insert_cart_item: `INSERT INTO tbl_cart (user_id, product_id,date) VALUE (?,?,?)`,
    read_cart_item: `SELECT * FROM tbl_cart`,
    update_cart: `UPDATE tbl_cart SET tbl_cart.product_quantity = ?,tbl_cart.status = 'purchase' WHERE tbl_cart.id = ? AND user_id =?`,
    delete_cart: `DELETE FROM tbl_cart WHERE id = ?`,
    select_cart_by_userid: `SELECT * FROM tbl_cart WHERE user_id = ?`,
    select_cart_item_Product_by_user: `SELECT * FROM tbl_cart WHERE user_id = ? AND product_id=? AND status = 'oncart'`,
    select_cart_by_userid_and_status: `SELECT * FROM tbl_cart WHERE user_id = ? AND status = ?`,
    select_cart_full_detail_product_and_category: `
    SELECT c.id as cartId,DATE_FORMAT(c.date, "%D %b %Y") as fdoa ,c.*,
     p.name as pname,p.*,
     t. NAME AS cate,t.description as catedesc, t.*
     FROM tbl_product AS p INNER JOIN tbl_cart AS c ON p.id = c.product_id
        INNER JOIN tbl_category AS t ON t.id = p.categoryID WHERE user_id = ? AND status='oncart'`,
    select_cart_full_detail_product_and_category_all: `
    SELECT c.id as cartId,DATE_FORMAT(c.date, "%D %b %Y") as fdoa ,c.*,
     p.name as pname,p.*,
     t. NAME AS cate,t.description as catedesc, t.*
     FROM tbl_product AS p INNER JOIN tbl_cart AS c ON p.id = c.product_id
        INNER JOIN tbl_category AS t ON t.id = p.categoryID WHERE user_id = ? ORDER BY c.status DESC`,
    select_cart_detail_by_cart_id: `
        SELECT c.id as cartId,DATE_FORMAT(c.date, "%D %b %Y") as fdoa ,c.*,
         p.name as pname,p.*,
         t. NAME AS cate,t.description as catedesc, t.*
         FROM tbl_product AS p INNER JOIN tbl_cart AS c ON p.id = c.product_id
            INNER JOIN tbl_category AS t ON t.id = p.categoryID WHERE c.id = ?`,
    delete_cart_by_user_id_and_cart_id: `DELETE FROM tbl_cart WHERE id = ? AND user_id = ?`
};

/*SELECT * FROM tbl_cart WHERE user_id = '10' AND product_id = '18' AND status ='oncart'*/