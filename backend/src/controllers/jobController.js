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
        const { timeframe } = req.query;
        let dateFilter = {};
        
        // Add date filtering based on timeframe
        if (timeframe) {
            const now = new Date();
            if (timeframe === 'week') {
                const lastWeek = new Date(now.setDate(now.getDate() - 7));
                dateFilter = { createdAt: { $gte: lastWeek } };
            } else if (timeframe === 'month') {
                const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
                dateFilter = { createdAt: { $gte: lastMonth } };
            } else if (timeframe === 'year') {
                const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
                dateFilter = { createdAt: { $gte: lastYear } };
            }
        }
        
        // Base query - include isActive for active jobs only
        const baseQuery = { isActive: true, ...dateFilter };
        
        // Jobs per location
        const jobsPerLocation = await Job.aggregate([
            { $match: baseQuery },
            { $group: { _id: "$location", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        // In-demand skills
        const inDemandSkills = await Job.aggregate([
            { $match: baseQuery },
            { $unwind: "$skills" },
            { $group: { _id: "$skills", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        // Average salary by job title
        const averageSalary = await Job.aggregate([
            { $match: baseQuery },
            { $group: { 
                _id: "$title", 
                avgMinSalary: { $avg: "$salary.min" },
                avgMaxSalary: { $avg: "$salary.max" },
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        
        // Jobs posted over time (grouped by month)
        const jobsOverTime = await Job.aggregate([
            { $match: { isActive: true } },
            { 
                $group: {
                    _id: { 
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $limit: 12 }
        ]);
        
        res.json({ 
            jobsPerLocation, 
            inDemandSkills, 
            averageSalary,
            jobsOverTime
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};