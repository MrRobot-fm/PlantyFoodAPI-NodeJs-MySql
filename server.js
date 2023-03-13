require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.NODE_LISTEN_PORT || 3001;
const db = require('./config/database');

// Models
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User routes middleware
app.use('/users', userRoutes);

// Product routes middleware
app.use('/products', productRoutes);

// Order routes middleware
app.use('/orders', orderRoutes);

// tables association
Product.belongsToMany(User, {
  through: Order,
  foreignKey: 'product_name',
  sourceKey: 'product',
  onDelete: 'CASCADE',
  constraints: false
});

User.belongsToMany(Product, {
  through: Order,
  foreignKey: 'user_name',
  sourceKey: 'firstName',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  constraints: false
});

Order.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Order.belongsTo(Product, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Authenticate to DB
db.authenticate()
  .then(() => {
    try {
      db.sync();
      console.log('Sync to db success ✔️');
    } catch (error) {
      console.log('Cant connect to database⛔');
    }
  })
  .then(() => {
    try {
      app.listen(3000, () => {
        console.log(`Listening on port ${PORT}✔️`);
      });
    } catch (error) {
      console.log('Cant listen on port⛔');
    }
  });

// 200 Page
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to Planty of food API Json Restful!' });
});

// 404 Page
app.get('/*', (req, res) => {
  res.status(404).json({ message: 'This page does not exist' });
});
