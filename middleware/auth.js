exports.isUser = async(req, res, next) => {
    if (req.isAuthenticated() && res.locals.user.role == "user") {
        next();
    } else {
        req.flash('danger', 'Please log in.');
        res.redirect('/user/login');
    }
}

exports.isAdmin = async(req, res, next) => {
    //console.log(res.locals.user.admin);
    if (req.isAuthenticated() && res.locals.user.role == "admin") {
        next();
    } else {
        req.flash('danger', 'Please log in as admin.');
        res.redirect('/user/login');
    }
}

exports.isSuperAdmin = async(req, res) => {
    if (req.isAuthenticated() && res.locals.user.role == 'superAdmin') {
        next();
    } else {
        req.flash('danger', 'Please log in as admin.');
        res.redirect('/user/login');
    }
}