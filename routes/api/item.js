const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemControllers');

router.get('/', (req, res) => res.send('Item working'));
router.get('/items', itemController.get_items);
router.post('/items', itemController.post_item);
router.put('/items/:id', itemController.update_item);
router.delete('/items/:id', itemController.delete_item);

module.exports = router;

// TO UPDATE
// replace all "/items" routes by "/category_name/item_slug"