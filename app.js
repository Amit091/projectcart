const express = require('express');
//const expressLayouts = require('express-ejs-layouts');//
const session = require('express-session');
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');


const passport = require('passport');
const favicon = require('serve-favicon');
const ejs = require('ejs');
const flash = require('connect-flash');
const chalk = require('chalk');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
var createError = require('http-errors');


const app = express();
const port = process.env.PORT || 3000;
const host = '127.0.0.2';
const logData = chalk.bold.teal;
const logInfo = chalk.bold.blue;
const logWarning = chalk.bold.orange;

const categoryDao = require('./DAO/category_dao');
const productDao = require('./DAO/product_dao');

//app.use(logger('dev'));
//EJS
app.set('views', path.join(__dirname, 'views'));
// app.use(expressLayouts);
// app.set('layout', 'layout/homeLayout');

app.set('view engine', 'ejs');
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', '/image/favicon.ico')));

//body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//express session
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    duration: 1000 * 1,

}));

app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

//connect-flash
app.use(flash());
app.use(cors());

//file upload
app.use(fileUpload());

//global variable
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    res.locals.logError = chalk.bold.red;
    next();
});

//validators
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namescape = param.split('.'),
            root = namescape.shift(),
            formParam = root;
        while (namescape.length) {
            formParam += '[' + namescape.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function(value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '.bmp':
                    return '.bmp';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));
//session
app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
});

//for global used of category
let catDao = new categoryDao();
catDao.getAllCategory().then((result) => {
    app.locals.gcate = result;
    if (result == null) {
        app.locals.gcate = [];
    }
}).catch((err) => {
    console.log(err);
});

let prodDao = new productDao();
prodDao.getAllProduct().then((result) => {
    app.locals.gProduct = result;
}).catch(err => {
    console.log(err);
});


//routing 
const homeRoute = require('./routes/homeRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const catRoute = require('./routes/categoryRoute');
const adminRoute = require('./routes/adminRoute');
const carRoute = require('./routes/cartRoute');

app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/category', catRoute);
app.use('/admin', adminRoute);
app.use('/mycart', carRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('partials/error');
});

module.exports = app;