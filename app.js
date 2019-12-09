var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/Movie');
require('./models/User');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/movie', require('./api/route/movie'));
app.use('/api/v1/user', require('./api/route/user'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//hung
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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
