const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', habitController.list);
router.post('/', habitController.create);
router.put('/:id', habitController.update);
router.delete('/:id', habitController.remove);
router.post('/:id/complete', habitController.complete);
router.get('/templates', habitController.getTemplates);
router.get('/:id', habitController.getHabitById);



module.exports = router;
