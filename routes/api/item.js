const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemControllers');

router.get('/', itemController.get_items);
router.post('/', itemController.post_item);
router.put('/update/', itemController.update_item);
router.post('/delete/', itemController.delete_item);
// router.put('/update/:id', itemController.update_item);
// router.delete('/delete/:id', itemController.delete_item);

module.exports = router;

// TO UPDATE
// replace all "/items" routes by "/category_name/item_slug"