const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const logDH = require('./middlewares/logDH');

const indexRouter = require('./routes/index');
const petsRouter = require('./routes/pets');
const servicosRouter = require('./routes/servicos');
const sobreRouter = require('./routes/sobre');
const loginRouter = require('./routes/login');
const contatoRouter = require('./routes/contato');
const adminRouter = require('./routes/admin');
const cadastroRouter = require('./routes/cadastro');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(logDH);

app.use(indexRouter);
app.use('/pets', petsRouter);
app.use('/servicos', servicosRouter);
app.use('/sobre', sobreRouter);
app.use('/login', loginRouter);
app.use('/contato', contatoRouter);
app.use('/admin', adminRouter);
app.use('/cadastro', cadastroRouter);

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
  res.render('error');
});

module.exports = app;