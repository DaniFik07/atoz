/*Sequelize mysql*/
var config = require('../config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
	config.mysql.database,
	config.mysql.username,
	config.mysql.password, {
		port: config.port,
		host: config.mysql.host,
		logging: console.log,
		dialect: 'mysql',
		define: {
			timestamps: false
	} 
	}
);

module.exports = sequelize;