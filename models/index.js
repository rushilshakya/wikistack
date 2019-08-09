const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

//before a page row is validated, the slug field is populated using the title field
Page.beforeValidate(pageInstance => {
  pageInstance.slug = makeSlug(pageInstance.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

function makeSlug(title) {
  let str = '';
  for (let i = 0; i < title.length; i++) {
    let currChar = title[i];
    if (currChar === ' ') str += '_';
    else str += currChar;
  }

  return str;
}

module.exports = { db, Page, User };
