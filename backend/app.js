var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});

module.exports = app;
