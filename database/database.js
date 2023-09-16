const Sequelize = require("sequelize");

const connection = new Sequelize('projPress', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = connection;