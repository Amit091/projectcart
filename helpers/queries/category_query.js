module.exports = {
    insert_cat: `INSERT INTO tbl_category (name, description) VALUE (?,?)`,
    read_cat: `SELECT * FROM tbl_category`,
    update_cat: `UPDATE tbl_category SET name = ?,description = ? WHERE id = ?`,
    delete_cat: `DELETE FROM tbl_category WHERE id = ?`,
    select_cat_byid: `SELECT * FROM tbl_category WHERE id = ?`,
    select_cat_byname: `SELECT * FROM tbl_category WHERE name = ?`,
};