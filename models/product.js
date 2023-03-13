const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Product;
