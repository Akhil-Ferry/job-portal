import React, { useState } from 'react';
import { createJob, updateJob } from '../services/api';

const JobForm = ({ job, onSubmit }) => {
    const [title, setTitle] = useState(job ? job.title : '');
    const [company, setCompany] = useState(job ? job.company : '');
    const [location, setLocation] = useState(job ? job.location : '');
    const [description, setDescription] = useState(job ? job.description : '');
    const [requirements, setRequirements] = useState(job ? job.requirements.join('\n') : '');
    const [salaryMin, setSalaryMin] = useState(job ? job.salary?.min : '');
    const [salaryMax, setSalaryMax] = useState(job ? job.salary?.max : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            title,
            company,
            location,
            description,
            requirements: requirements.split('\n').map(r => r.trim()).filter(Boolean),
            salary: { min: Number(salaryMin), max: Number(salaryMax) }
        };
        try {
            if (job) {
                await updateJob(job._id, jobData);
            } else {
                await createJob(jobData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting job form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Job Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Company:</label>
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Requirements (one per line):</label>
                <textarea value={requirements} onChange={e => setRequirements(e.target.value)} required />
            </div>
            <div>
                <label>Salary Min:</label>
                <input type="number" value={salaryMin} onChange={e => setSalaryMin(e.target.value)} required />
            </div>
            <div>
                <label>Salary Max:</label>
                <input type="number" value={salaryMax} onChange={e => setSalaryMax(e.target.value)} required />
            </div>
            <button type="submit">{job ? 'Update Job' : 'Create Job'}</button>
        </form>
    );
};

export default JobForm;