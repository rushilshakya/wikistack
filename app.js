const morgan = require('morgan');
const express = require('express');
const models = require('./models');


// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<body>hello world</body>');
});


const syncDb = async () => {
  await models.db.sync({force: true});

  const PORT = 1437;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

syncDb();

