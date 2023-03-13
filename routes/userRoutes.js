const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes

// Get all user
router.get('/', userController.user_get_all);

// Get user by email
router.get('/user-email', userController.user_by_email_get);

// Get user by name
router.get('/username', userController.user_by_name_get);

// Get user by lastname
router.get('/lastname', userController.user_by_lastname_get);

// Get user by Id
router.get('/:userId', userController.user_by_id_get);

// Create new user
router.post('/', userController.user_create_post);

// Update user and order
router.patch('/:userId', userController.user_update_patch);

// Delete user
router.delete('/:userId', userController.user_delete);

module.exports = router;
