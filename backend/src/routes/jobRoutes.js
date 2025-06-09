const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to create a new job post
router.post('/', jobController.createJob);

// Route to get all job posts
router.get('/', jobController.getJobs);

// Route to update a job post by ID
router.put('/:id', jobController.updateJob);

// Route to delete a job post by ID
router.delete('/:id', jobController.deleteJob);

// Route to get job analytics summary
router.get('/analytics/summary', jobController.analytics);

module.exports = router;