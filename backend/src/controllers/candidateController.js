const Candidate = require('../models/Candidate');

// Create a new candidate profile
exports.createCandidateProfile = async (req, res) => {
    try {
        const candidateData = req.body;
        const newCandidate = new Candidate(candidateData);
        await newCandidate.save();
        res.status(201).json({ message: 'Candidate profile created successfully', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ message: 'Error creating candidate profile', error: error.message });
    }
};

// Update an existing candidate profile
exports.updateCandidateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedCandidate = await Candidate.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate profile updated successfully', candidate: updatedCandidate });
    } catch (error) {
        res.status(500).json({ message: 'Error updating candidate profile', error: error.message });
    }
};

// Get candidate profile by ID
exports.getCandidateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving candidate profile', error: error.message });
    }
};

// Delete a candidate profile
exports.deleteCandidateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCandidate = await Candidate.findByIdAndDelete(id);
        if (!deletedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting candidate profile', error: error.message });
    }
};

// Create a new candidate
exports.createCandidate = async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get candidates with optional search and pagination
exports.getCandidates = async (req, res) => {
    try {
        const { search, skills, page = 1, limit = 10 } = req.query;
        let query = { isActive: true };

        if (search) query.$text = { $search: search };
        if (skills) query.skills = { $in: skills.split(',') };

        const candidates = await Candidate.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a candidate by ID
exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Soft delete a candidate by ID
exports.deleteCandidate = async (req, res) => {
    try {
        await Candidate.findByIdAndUpdate(req.params.id, { $set: { isActive: false } });
        res.json({ message: 'Candidate deleted (soft delete)' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};