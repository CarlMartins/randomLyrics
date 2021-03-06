var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404);
  res.send('Invalid');
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});

module.exports = app;
