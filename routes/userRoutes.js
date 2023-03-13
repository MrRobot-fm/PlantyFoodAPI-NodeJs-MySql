const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes

router.get('/', userController.user_get_all);

router.get('/user-email', userController.user_by_email_get);

router.get('/username', userController.user_by_name_get);

router.get('/lastname', userController.user_by_lastname_get);

router.get('/:userId', userController.user_by_id_get);

router.post('/', userController.user_create_post);

router.patch('/only-user/:userId', userController.user_update_patch);

router.delete('/:userId', userController.user_delete);

module.exports = router;
