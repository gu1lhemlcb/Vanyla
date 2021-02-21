const { Router } = require('express');
const itemController = require('../controllers/extraControllers');
const router = Router;

router.get('/announcements', extraController.get_announcements);

module.exports = router;