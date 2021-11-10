const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const { mysqlConfig } = require("../databaseConfig");


async function initialize() {
	let db = {};
	// create db if it doesn't already exist
	const { host, port, user, password, database } = mysqlConfig;
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
	db.User = require("./model/task")(sequelize);

	// sync all models with database
	await sequelize.sync();

	return db;
}

module.exports = initialize;
