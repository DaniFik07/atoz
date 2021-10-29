/* jshint indent: 2 */
let Sequelize = require('sequelize');
let sequelize = require('../common/mysql');

const Users = sequelize.define('users', {
    id: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'name'
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'email'
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'password'
    }},
    {
    tableName: 'users',
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
  });

  module.exports = Users;
