const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');

const {server: {PORT}} = require('./config');
const db = require('./db');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(require('./helpers/server-error'));

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
