const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.orders_get_all);

router.get('/date', ordersController.orders_by_date_get);

router.get('/product', ordersController.orders_by_product_get);

router.get('/user', ordersController.orders_by_user_get);

router.get('/product/:productId', ordersController.orders_by_product_id_get);

router.get('/user/:userId', ordersController.orders_by_user_id_get);

router.get('/:orderId', ordersController.orders_by_id_get);

router.post('/', ordersController.create_order_post);

router.post('/new-order', ordersController.order_create_userAndProduct_post);

router.patch('/:orderId', ordersController.order_update_patch);

router.delete('/:orderId', ordersController.order_delete);

module.exports = router;
