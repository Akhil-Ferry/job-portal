const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { authMiddleware, isCandidate } = require('../middlewares/authMiddleware');

// Route to create a new candidate profile
router.post('/', candidateController.createCandidateProfile);

// Route to get all candidates
router.get('/', candidateController.getCandidates);

// Route to update an existing candidate profile
router.put('/:id', candidateController.updateCandidateProfile);

// Route to delete a candidate profile
router.delete('/:id', candidateController.deleteCandidateProfile);

// Route to get the authenticated candidate's profile
router.get('/profile', authMiddleware, isCandidate, async (req, res) => {
    try {
        const User = require('../models/User');
        const Candidate = require('../models/Candidate');
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const candidate = await Candidate.findOne({ email: user.email });
        if (!candidate) return res.status(404).json({ message: 'Candidate profile not found' });
        res.json(candidate);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
});

module.exports = router;