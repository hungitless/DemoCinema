var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/Movie');
require('./models/User');
var path = require('path');
var nodemailer = require('nodemailer');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./config/passport');
// const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');

var app = express();

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//          user: 'thaiquanghungit@gmail.com',
//          pass: 'hunghieu'
//      }
//  });

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Express body parser
app.use(express.urlencoded({ extended: true }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/movie', require('./api/route/movie'));
app.use('/api/v1/user', require('./api/route/user'));
app.use('/api/v1/login', require('./api/route/login'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//hung file upload
// enable files upload
app.use(fileUpload({
  // createParentPath: true
}));

// //add other middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));


//make uploads directory static
app.use(express.static('uploads'));



module.exports = app;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cinema-9zo1y.mongodb.net/cinema?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
mongoose.connection
  .then(()=>console.log('DB connected!'))
  .catch(err=>console.log(err.message))

