/* jshint indent: 2 */
let Sequelize = require('sequelize');
let sequelize = require('../common/mysql');

const Orders = sequelize.define('orders', {
    id: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    states: {
      type: Sequelize.ENUM('pending','cancelled','success','failed'),
      field: 'states'
    },
    order_no: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'order_no'
    },
    type: {
      type: Sequelize.ENUM('prepaid','product'),
      allowNull: false,
      field: 'type'
    },
    no_telpon: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'no_telpon'
    },
    value: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'value'
    },
    price: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'price'
    },
    product_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'product_name'
    },
    address: {
      type: Sequelize.TEXT(),
      allowNull: true,
      field: 'address'
    },
    shipping_code: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'shipping_code'
    },
    user_id: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      field: 'user_id'
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'date'
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  },
    {
    tableName: 'orders',
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
  });

  module.exports = Orders;
