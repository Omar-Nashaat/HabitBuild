const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/me/progress', auth, controller.getProgress);

module.exports = router;
