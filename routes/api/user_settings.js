const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authControllers');
const userController = require('../../controllers/userControllers');
const auth = require('../../middleware/auth');

// router.get('/user', auth, authController.get_user);
router.get('/settings', auth, userController.update_profile);
// router.post('/user/delete', userController.delete_profile);

module.exports = router;