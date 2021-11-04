const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require('dotenv').config()

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

console.log(config)

async function initialize() {
  let db = {};
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    logging: false,
  });

  // init models and add them to the exported db object
  db.User = require("./task")(sequelize);

  // sync all models with database
  await sequelize.sync();

  return db;
}

module.exports = initialize;
