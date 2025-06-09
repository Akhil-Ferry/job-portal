const Application = require('../models/Application');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');

// Apply for a job
exports.applyJob = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get applications for a candidate
exports.getApplicationsByCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const applications = await Application.find({ candidate: candidateId }).populate('job');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

// Update application status
exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(application);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all applications for a job
exports.getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ job: jobId }).populate('candidate');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

// Get all applications with optional candidate filtering
exports.getApplications = async (req, res) => {
    try {
        const { candidateId } = req.query;
        let query = {};
        if (candidateId) query.candidate = candidateId;
        const applications = await Application.find(query).populate('job candidate');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};