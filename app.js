const morgan = require('morgan');
const express = require('express');
const models = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wiki);
app.use('/user', user);

app.get('/', (req, res) => {
  res.send('<body>hello world</body>');
});

const syncDb = async () => {
  // await models.db.sync({ force: true });

  const PORT = 1437;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

syncDb();
