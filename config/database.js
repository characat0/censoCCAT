const { Sequelize } = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const dialect = 'mysql';

const sequelize = new Sequelize({ database, host, port, dialect, username, password });

module.exports = sequelize;