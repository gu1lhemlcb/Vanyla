const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authControllers');
const auth = require('../../middleware/auth');

router.get('/user', auth, authController.get_user);
router.post('/register', authController.sign_up);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

module.exports = router;