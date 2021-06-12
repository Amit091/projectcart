module.exports = {
    //Create
    insert_product: `INSERT INTO tbl_product (name, price,categoryID,description,imagepath) VALUE (?,?,?,?,?)`,
    //Read
    read_product: `SELECT p.*,DATE_FORMAT(p.doa, "%Y-%b-%d") as fdoa  FROM tbl_product as p `,
    select_product_by_id: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p WHERE id = ?`,
    select_product_by_name: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p WHERE name = ?`,
    select_product_by_category_id: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p WHERE categoryID = ?`,
    //Update
    update_product: `UPDATE tbl_product  SET 
    tbl_product.name = ?,tbl_product.price = ?,tbl_product.categoryID=?,tbl_product.description=?,tbl_product.imagepath=? WHERE tbl_product.id = ?`,
    //DELETE
    delete_product: `DELETE FROM tbl_product  WHERE id = ?`,
    delete_product_by_category: `DELETE * FROM tbl_product WHERE categoryID = ?`,
    select_product_by_category_id_order_by_price: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p WHERE categoryID = ? ORDER BY price`,
    select_product_by_category_id_order_by_name: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p WHERE categoryID = ? ORDER BY name`,
    //sort walla SQL
    select_product_order_by_price: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p ORDER BY price`,
    select_product_order_by_name: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa FROM tbl_product as p ORDER BY name`,
    select_product_order_by_category: `SELECT p.*,DATE_FORMAT(p.doa, "%D %b %Y") as fdoa  FROM tbl_product as p ORDER BY categoryID`,
    select_product_full_detail:`SELECT p.* , DATE_FORMAT(p.doa, "%D %b %Y") as fdoa ,c.name as category FROM tbl_product AS p INNER JOIN tbl_category AS c WHERE p.categoryID = c.id ORDER BY p.id`
    //SELECT p.*,DATE_FORMAT(p.doa, "%Y-%b-%d, %a ") as doaa FROM tbl_product AS p; 
};