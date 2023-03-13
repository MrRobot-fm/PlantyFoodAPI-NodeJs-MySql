const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Get All Products
router.get('/', productsController.product_get_all);

// Get Product By Name
router.get('/product', productsController.product_by_name_get);

// Get Product By Id
router.get('/:productId', productsController.product_by_id_get);

// Create New Product
router.post('/', productsController.create_product_post);

// Update Product Information
router.patch('/:productId', productsController.product_update_patch);

// Delete Product
router.delete('/:productId', productsController.product_delete);

module.exports = router;
