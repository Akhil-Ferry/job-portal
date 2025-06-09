const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authMiddleware, isEmployer } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', jobController.getJobs);

// Protected routes
router.post('/', authMiddleware, isEmployer, jobController.createJob);
router.put('/:id', authMiddleware, isEmployer, jobController.updateJob);
router.delete('/:id', authMiddleware, isEmployer, jobController.deleteJob);

// Analytics route
router.get('/analytics', authMiddleware, jobController.analytics);

module.exports = router;