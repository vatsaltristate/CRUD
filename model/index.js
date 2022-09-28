const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodedb","postgres","12345", {
  host:'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tute.model.js")(sequelize, Sequelize);

module.exports = db;