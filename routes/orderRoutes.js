const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Get all the orders
router.get('/', ordersController.orders_get_all);

// Get orders by date
router.get('/date', ordersController.orders_by_date_get);

// Get orders by product
router.get('/product', ordersController.orders_by_product_get);

// Get orders by user
router.get('/user', ordersController.orders_by_user_get);

// Get orders by product Id
router.get('/product/:productId', ordersController.orders_by_product_id_get);

// Get orders by user Id
router.get('/user/:userId', ordersController.orders_by_user_id_get);

// Get order by Id
router.get('/:orderId', ordersController.orders_by_id_get);

// Create new order whit existing user and product
router.post('/', ordersController.create_order_post);

// Create user and product while creating new order
router.post('/new-order', ordersController.order_create_userAndProduct_post);

// Update Order
router.patch('/:orderId', ordersController.order_update_patch);

// Delete order
router.delete('/:orderId', ordersController.order_delete);

module.exports = router;
