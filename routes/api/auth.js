const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authControllers');

// const auth = require('../middleware/auth');

router.get('/', (req, res) =>  {
    res.send('Auth working');
});
// router.get('/user', authController.get_user);
router.post('/register', authController.sign_up);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);

module.exports = router;