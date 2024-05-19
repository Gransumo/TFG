const express = require('express');
const friendshipController = require('../Controllers/friendshipcontroller');
const router = express.Router();

router.get('/get-friend-list', friendshipController.getList);
router.delete('/delete', friendshipController.destroy);

module.exports = router;
