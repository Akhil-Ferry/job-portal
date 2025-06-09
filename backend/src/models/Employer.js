const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    }],
}, { timestamps: true });

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;