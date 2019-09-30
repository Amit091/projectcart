module.exports = {
    insert_user: `INSERT INTO tbl_user () VALUES(?,?)`,
    read_todo: `SELECT * FROM tbl_user`,
    update_todo: `UPDATE tbl_todo SET tbl_user.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?`,
    delete_todo: `DELETE FROM tbl_todo WHERE tbl_user.id = ?`
}