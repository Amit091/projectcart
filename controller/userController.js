const bcryptjs = require('bcryptjs');
const passport = require('passport');
const userDao = require("./../DAO/user_dao");
const udao = new userDao();

exports.getUserLoginPage = async(req, res) => {
    try {
        console.log(res.locals.user);
        
        if (res.locals.user) {
            // console.log('from login');
            // console.log(res.locals.user);
            req.flash('success_msg', 'Already Login');
            if (res.locals.user.role == 'user') res.redirect('/');
            else if (res.locals.user.role == 'admin') res.redirect('/admin');
        } else {
            res.render("user/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.postLoginPage = async(req, res, next) => {
    // console.log('user login');
    try {
        let uemail = req.body.email;
        req.checkBody('email', 'Invalid Email!').isEmail();
        req.checkBody('email', 'Email Is Required !').notEmpty();
        req.checkBody('password', 'Password Is Blank !').notEmpty();
        req.checkBody('password', 'Password too short!').isLength({min:5});
        var errors = req.validationErrors();
        //console.log(errors);
        if (errors ){
            console.log(errors)
            res.render("user/login", {
                errors,
                uemail
            });
        }else{
        //check variable
        await passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash('error_msg', 'Invalid Credentials');
                return res.redirect('/user/login');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                if (user.role == 'user') {
                    // console.log('user lOgin');
                    req.flash('success_msg', 'User Login');
                    return res.redirect('/');
                }
                if (user.role == 'admin') {
                    req.flash('success_msg', 'Admin Login');
                    return res.redirect('/admin');
                }
            });
        }, {
            successMessage: true,
            failureRedirect: '/user/login',
            failureFlash: true,
        })(req, res, next);
    }
    } catch (error) {
        console.log(error);
    }
};
exports.getUserRegisterPage = async(req, res) => {
    try {
        if (res.locals.user) {
            // console.log('from login');
            // console.log(res.locals.user);
            req.flash('success_msg', 'Already Register');
            if (res.locals.user.role == 'user') res.redirect('/');
            else if (res.locals.user.role == 'admin') res.redirect('/admin');
        } else {
            res.render("user/register");
        }
    } catch (error) {
        console.log(error);
    }
};

//doing this part
exports.postUserRegisterPage = async(req, res) => {
    try {
        console.log('----adding  user');
        var fuser = req.body;
        //console.log(fuser);
        //checking form data
        req.checkBody('firstName', 'FirstName Is Required !').notEmpty();
        req.checkBody('lastName', 'LastName Is Required !').notEmpty();
        req.checkBody('address', 'Address Is Required !').notEmpty();
        req.checkBody('contact', 'Contact Is Required !').notEmpty();
        req.checkBody('contact', 'Invalid Contact Number!').isLength({
            min: 10,
            max: 10
        });
        req.checkBody('genderBtn', 'Gender Is Required !').notEmpty();
        req.checkBody('genderBtn', 'Gender Not Defined !').isIn(['male', 'female', 'other']);
        req.checkBody('email', 'Email Is Required !').notEmpty();
        req.checkBody('email', 'Enter Valid Email!').isEmail();
        req.checkBody('userName', 'User Name is Required!').notEmpty();
        req.checkBody('password', 'Password is Required!').notEmpty();
        req.checkBody('password2', 'Confirm Password is Required!').notEmpty();
        req.checkBody('password', 'Password must be 8 character Long!').isLength({ min: 8 });
        req.checkBody('password2', 'Password must be 8 character Long!').isLength({ min: 8 });
        req.checkBody('password2', 'Password must be matched!').equals(req.body.password);

        var errors = req.validationErrors();
      
        if (errors ){
            console.log(errors)
            res.render("user/register", {
                errors,
                fuser
            });
        } else {
            //checking the Db Data
            // check user by username
            errors= [];
            let dbUser = await udao.getAllUserByUsername(fuser.userName);
            if (dbUser != "") {
                errors.push({ msg: "Username already in Used, have new one" });
                //res.send(req.body);
                res.render("user/register", {
                    fuser,
                    errors
                });
                return;
            } else {
                //check user by email
                let dbUser = await udao.getAllUserByEmail(fuser.email);
                console.log('via email');
                if (dbUser != "") {
                    errors.push({ msg: "Email already in Used, have new one" });
                    //  res.send(req.body);
                    res.render("user/register", {
                        fuser,
                        errors
                    });
                    return;
                } else {
                    console.log('inserting new user');
                    //maing Code to insert the iuser
                    let salt = await bcryptjs.genSalt(10);
                    let hash = await bcryptjs.hash(fuser.password, salt);
                    fuser.password = hash;
                    fuser.password2 = '';
                    console.log(fuser);
                    let status = await udao.saveUser(fuser);
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
        res.render("admin/userList");
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

