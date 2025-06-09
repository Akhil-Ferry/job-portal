const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Apply for a job
router.post('/', applicationController.applyJob);

// Get all applications (optional, implement getApplications if needed)
router.get('/', applicationController.getApplications);

// Get applications by candidate ID
router.get('/candidate/:candidateId', applicationController.getApplicationsByCandidate);

// Get applications by job ID
router.get('/job/:jobId', applicationController.getApplicationsByJob);

// Update application status
router.put('/:id', applicationController.updateApplication);

module.exports = router;