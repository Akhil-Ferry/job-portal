const Job = require('../models/Job');

// Create a new job listing
exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all job listings
exports.getJobs = async (req, res) => {
    try {
        const { search, location, skills, minSalary, maxSalary, page = 1, limit = 10 } = req.query;
        let query = { isActive: true };

        if (search) query.$text = { $search: search };
        if (location) query.location = location;
        if (skills) query.skills = { $in: skills.split(',') };
        if (minSalary || maxSalary) {
            query['salary.min'] = { $gte: Number(minSalary) || 0 };
            query['salary.max'] = { $lte: Number(maxSalary) || 1e9 };
        }

        const jobs = await Job.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a job listing
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a job listing
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.id, { $set: { isActive: false } });
        res.json({ message: 'Job deleted (soft delete)' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Analytics for job statistics
exports.analytics = async (req, res) => {
    try {
        const jobsPerLocation = await Job.aggregate([
            { $group: { _id: "$location", count: { $sum: 1 } } }
        ]);
        const inDemandSkills = await Job.aggregate([
            { $unwind: "$skills" },
            { $group: { _id: "$skills", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json({ jobsPerLocation, inDemandSkills });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};