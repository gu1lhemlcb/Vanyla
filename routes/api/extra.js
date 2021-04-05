const express = require('express');
const router = express.Router();
const extraController = require('../../controllers/extraControllers');

router.get('/', (req, res) => res.send('Extra working'));
// router.get('/announcements', extraController.get_announcements);

module.exports = router;