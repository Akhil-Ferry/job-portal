const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, text: true },
    company: { type: String, required: true },
    location: { type: String, required: true, index: true },
    description: String,
    requirements: [String],
    salary: { min: Number, max: Number },
    skills: [{ type: String, index: true }],
    postedBy: { type: String }, // For simplicity, just a string
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

jobSchema.index({ title: 'text', skills: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);