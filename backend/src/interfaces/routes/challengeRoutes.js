const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengeController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

// Specific routes first
router.get('/:id/progress', controller.getAllChallenges);
router.get('/:userId/:id', controller.getChallenge);

// Then general ones
router.get('/', controller.list);
router.get('/:id', controller.details);
router.post('/', controller.create);
router.post('/:id/join', controller.join);
router.post('/:id/leave', controller.leave);
router.post('/:id/complete', controller.completeChallengeMilestone);


module.exports = router;
