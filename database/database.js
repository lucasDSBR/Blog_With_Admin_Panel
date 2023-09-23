const Sequelize = require("sequelize");

const connection = new Sequelize('projPress', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: "-07:00"
});

module.exports = connection;