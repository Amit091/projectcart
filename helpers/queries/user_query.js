module.exports = {
    create_user: `INSERT INTO tbl_user(firstname,lastname,address,contact,email,username,password,gender) VALUE (?,?,?,?,?,?,?,?)`,
    create_admin_user: `INSERT INTO tbl_user(firstname,lastname,address,contact,email,username,password,gender,role) VALUE (?,?,?,?,?,?,?,?,?)`,
    read_user: `SELECT * FROM tbl_user where id !=? AND role = 'user'`,
    read_user_login: `SELECT * FROM tbl_user WHERE username =? and password = ?`,
    read_user_by_id: `SELECT * FROM tbl_user WHERE id =?`,
    read_user_by_role: `SELECT * FROM tbl_user WHERE role =?`,
    read_user_by_user_name: `SELECT * FROM tbl_user WHERE username =?`,
    read_user_by_email: `SELECT * FROM tbl_user WHERE email =?`,
    update_user: `UPDATE tbl_user SET tbl_user.firstname =?,tbl_user.lastname=?,tbl_user.address=?,tbl_user.contact=?,tbl_user.email=?,tbl_username=?,tbl_user.password=? WHERE tbl_user.id=?`,
    update_user_role: `UPDATE tbl_user SET tbl_user.role =? WHERE tbl_user.id =?`,
    delete_user: `DELETE FROM tbl_user WHERE tbl_user.id = ?`
};