const bcryptjs = require('bcryptjs');
const passport = require('passport');

const userDao = require("./../DAO/user_dao");

exports.getUserLoginPage = async(req, res) => {
    try {
        if (res.locals.user) {
            console.log('from login');
            console.log(res.locals.user);
            req.flash('success_msg', 'Already Logi78465132n')
            if (res.locals.user.role == 'user') res.redirect('/');
            else if (res.locals.user.role == 'admin') res.redirect('/admin');
            else if (res.locals.user.role == 'superadmin') res.redirect('/admin');
            res.redirect('/');
        } else {
            res.render("user/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.postLoginPage = async(req, res, next) => {
    console.log('user login');

    try {
        //check variable
        await passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash('success_msg', 'User Login');
                return res.redirect('/user/login');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                if (user.role == 'user') {
                    console.log('user lOgin');
                    req.flash('success_msg', 'User Login');
                    return res.redirect('/');
                }
                if (user.role == 'admin') {
                    req.flash('success_msg', 'Admin Login');
                    return res.redirect('/admin');
                }
                if (user.role == 'superAdmin') {
                    req.flash('success_msg', 'Super Admin Login');
                    return res.redirect('/admin');
                }
            });
        }, {
            successMessage: true,
            failureRedirect: '/user/login',
            failureFlash: true,
        })(req, res, next);
        console.log(req.session);


    } catch (error) {
        console.log(error);
    }
};
exports.getUserRegisterPage = async(req, res) => {
    try {
        res.render("user/register", { layout: "layout/adminLayout" });
    } catch (error) {
        console.log(error);
    }
};

//doing this part
exports.postUserRegisterPage = async(req, res) => {
    try {
        const udao = new userDao();
        let formUser = req.body;
        //res.send(formUser);

        /*
        firstName": "amit",
  "lastName": "adas",
  "address": "asdasdasdad",
  "contact": "1234567890",
  "genderBtn": "male",
  "email": "a@gmail.com",
  "userName": "amit091",
  "password": "789456123",
  "password2": "789456123"*/

        req
            .checkBody(formUser.firstName)
            .isEmpty()
            .withMessage("First Name is required!");
        req
            .checkBody(formUser.lastName)
            .isEmpty()
            .withMessage("Last Name is required!");
        req
            .checkBody(formUser.address)
            .isEmpty()
            .withMessage("Address is required!");
        req
            .checkBody(formUser.contact)
            .isEmpty()
            .withMessage("Address is required!");
        // //req.checkBody(formUser.userName).isEmpty().withMessage('Username is required!');
        // //  req.checkBody(formUser.email, 'Email is required!').isEmail();
        // req.checkBody('email', 'Email is required!').isEmail();
        // req.checkBody(formUser.userName, 'Username is required!').notEmpty();
        // req.checkBody(formUser.password, 'Password is required!').notEmpty();
        // req.checkBody(formUser.password2, 'Passwords do not match!').equals(formUser.password);
        // // req.checkBody(formUser.password).isEmpty().withMessage('Password is required!').isLength({ min: 6 }).withMessage('must be at least 6 chars long!');
        // // req.checkBody(formUser.password2).isEmpty().withMessage('Password is required!').isLength({ min: 6 }).withMessage('must be at least 6 chars long!').equals(formUser.password).withMessage("Passwords don't Match !");

        //checking form data
        var errors = req.validationErrors();
        if (errors) {
            res.render("user/register", {
                errors,
                user: formUser,
                layout: "layout/adminLayout"
            });
        } else {
            errors = [];
            //checking the Db Data
            // check user by username
            let dbUser = await udao.getAllUserByUsername(formUser.userName);
            console.log(dbUser);

            if (dbUser != "") {
                errors.push({ msg: "Username already in Used, have new one" });
                //res.send(req.body);
                res.render("user/register", {
                    layout: "layout/adminLayout",
                    user: formUser,
                    errors
                });
                return;
            } else {
                //check user by email
                let dbUser = await udao.getAllUserByEmail(formUser.email);
                console.log('via email');
                if (dbUser != "") {
                    errors.push({ msg: "Email already in Used, have new one" });
                    //  res.send(req.body);
                    res.render("user/register", {
                        layout: "layout/adminLayout",
                        user: formUser,
                        errors
                    });
                    return;
                } else {
                    console.log('inserting new user');
                    //maing Code to insert the iuser

                    let salt = await bcryptjs.genSalt(10);
                    console.log(salt);
                    console.log(formUser);
                    let hash = await bcryptjs.hash(formUser.password, salt);
                    formUser.password = hash;
                    formUser.password2 = '';
                    console.log(formUser);
                    let status = await udao.saveUser(formUser);
                    console.log(status);
                    if (status.affectedRows == 1 && status.serverStatus == 2) {
                        console.log('Done Saving uSer');
                        req.flash('success_msg', 'You are now registered!');
                        res.redirect('/user/login');
                    } else {
                        req.flash('error_msg', 'You are not registered!');
                        res.redirect('/user/register');
                    }
                } //for get by email
            } //for get by username
        } //./for express validators
    } catch (error) {
        console.log(error);
    }
};

exports.getAllUser = async(req, res) => {
    try {
        res.render("admin/userList", { layout: "layout/adminLayout" });
    } catch (error) {
        console.log(error);
    }
};

exports.userLogout = async(req, res) => {
    try {
        //delete req.session.cart;
        await req.logout();
        req.flash('success_msg', 'You are logged out!');
        res.redirect('/user/login');
    } catch (error) {
        console.log(error);
    }
};