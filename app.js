const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const ejs = require('ejs');
const flash = require('connect-flash');
const chalk = require('chalk');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;
const host = '127.0.0.2';
const logData = chalk.bold.teal;
const logInfo = chalk.bold.blue;
const logWarning = chalk.bold.orange;

app.use(logger('dev'));
//EJS
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));
app.set('layout', 'layout/homeLayout');

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
//connect-flash
app.use(flash());
app.use(cors());

//global variable
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    res.locals.logError = chalk.bold.red;

    next();
});



//routing 
const homeRoute = require('./routes/homeRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const catRoute = require('./routes/categoryRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/category', catRoute);
app.use('/admin', adminRoute);





app.listen(port, host, () => {
    console.log(logInfo(
        `Example app listening on port ${port} ${host} ]!`))
});