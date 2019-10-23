exports.isUser = async(req, res, next) => {
    if (req.isAuthenticated() && res.locals.user.role == "user") {
        next();
    } else {
        req.flash('warning_msg', 'Please log in.');
        res.redirect('/user/login');
    }
}

exports.isAdmin = async(req, res, next) => {
    //console.log(res.locals.user.admin);
    if (req.isAuthenticated() && res.locals.user.role == "admin") {
        next();
    } else {
        req.flash('warning_msg', 'Please log in as admin.');
        res.redirect('/');
    }
}

exports.isSuperAdmin = async(req, res) => {
    if (req.isAuthenticated() && res.locals.user.role == 'superAdmin') {
        next();
    } else {
        req.flash('warning_msg', 'Please log in as Superadmin.');
        res.redirect('/user/login');
    }
}