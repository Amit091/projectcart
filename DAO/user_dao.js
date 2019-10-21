const gcon = require('./../helpers/dbConnection');
const query = require('./../helpers/queries/user_query');
var currDate = require('./../helpers/getDate');
var con;

module.exports = class userDAO {

    async saveUser(user) {
        try {
            con = await gcon();
            let status = await con.query(query.create_user, [user.firstName, user.lastName, user.address, user.contact, user.email, user.userName, user.password, user.genderBtn]);
            status = await JSON.parse(JSON.stringify(status));
            console.log(status);
            return status;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async getAllUser() {
        try {
            con = await gcon();
            let users = await con.query(query.read_user);
            users = JSON.parse(JSON.stringify(users));
            return users;
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    async getAllUserById(id) {
        try {
            con = await gcon();
            let user = await con.query(query.read_user_by_id, [id]);
            user = await JSON.parse(JSON.stringify(user));
            console.log(user.length);
            user = (user.length != 0) ? await user.reduce(item => { return item }) : null;
            return (user != null) ? user : '';
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
    async getAllUserByUsername(username) {
        try {
            con = await gcon();
            let user = await con.query(query.read_user_by_user_name, [username]);
            user = await JSON.parse(JSON.stringify(user));
            console.log(user.length);
            user = (user.length != 0) ? await user.reduce(item => { return item }) : null;
            return (user != null) ? user : '';
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async getAllUserByEmail(email) {
        try {
            con = await gcon();
            let user = await con.query(query.read_user_by_email, [email]);
            user = await JSON.parse(JSON.stringify(user));
            user = (user.length != 0) ? await user.reduce(item => { return item }) : null;
            return (user != null) ? user : '';
        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }

    async sample() {
        try {

        } catch (error) {
            console.log(error);
        } finally {
            con.end();
        }
    }
};