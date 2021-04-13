const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authControllers');
const userController = require('../../controllers/userControllers');
const auth = require('../../middleware/auth');

// router.get('/user', auth, authController.get_user);
router.put('/settings', auth, userController.update_profile);
router.get('/delete-profile', auth, userController.delete_profile);

module.exports = router;