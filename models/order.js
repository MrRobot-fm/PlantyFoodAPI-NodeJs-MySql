const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const Order = sequelize.define('Order', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATEONLY,
    get: function () {
      var now = new Date();
      now.toLocaleDateString('en-GB');

      return now.toLocaleDateString('en-GB');
    }
  },
  updatedAt: {
    type: Sequelize.DATEONLY,
    get: function () {
      var now = new Date();
      now.toLocaleDateString('en-GB');

      return now.toLocaleDateString('en-GB');
    }
  }
});

module.exports = Order;
