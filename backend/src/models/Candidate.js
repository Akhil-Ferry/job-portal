const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    skills: [{ type: String, index: true }],
    education: String,
    experience: String,
    resume: String, // URL or base64
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

candidateSchema.index({ skills: 'text', name: 'text' });

module.exports = mongoose.model('Candidate', candidateSchema);