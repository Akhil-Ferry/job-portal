const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path based on your User model location

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.id;
        next();
    });
};

const isEmployer = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            if (user.role !== 'employer') {
                return res.status(403).json({ message: 'Require Employer Role!' });
            }
            next();
        })
        .catch(err => res.status(500).json({ message: err.message }));
};

const isCandidate = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            if (user.role !== 'candidate') {
                return res.status(403).json({ message: 'Require Candidate Role!' });
            }
            next();
        })
        .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = {
    authMiddleware,
    isEmployer,
    isCandidate
};