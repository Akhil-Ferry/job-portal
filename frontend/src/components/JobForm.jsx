import React, { useState } from 'react';
import { createJob, updateJob } from '../services/api';

const JobForm = ({ job, onSubmit }) => {
    const [title, setTitle] = useState(job ? job.title : '');
    const [company, setCompany] = useState(job ? job.company : '');
    const [location, setLocation] = useState(job ? job.location : '');
    const [customLocation, setCustomLocation] = useState('');
    const [description, setDescription] = useState(job ? job.description : '');
    const [requirements, setRequirements] = useState(job ? job.requirements.join('\n') : '');
    const [salaryMin, setSalaryMin] = useState(job ? job.salary?.min : '');
    const [salaryMax, setSalaryMax] = useState(job ? job.salary?.max : '');
    const [skills, setSkills] = useState(job ? job.skills.join(',') : '');
    const [selectedIndustry, setSelectedIndustry] = useState(job ? job.industry : 'Technology');
    const [employmentType, setEmploymentType] = useState(job ? job.employmentType : 'Full-time');
    const [showCustomLocation, setShowCustomLocation] = useState(false);
    
    // Indian locations for dropdown
    const indianLocations = [
        "Bangalore, Karnataka", 
        "Mumbai, Maharashtra", 
        "Delhi NCR", 
        "Hyderabad, Telangana", 
        "Chennai, Tamil Nadu",
        "Pune, Maharashtra", 
        "Kolkata, West Bengal", 
        "Ahmedabad, Gujarat", 
        "Jaipur, Rajasthan",
        "Chandigarh", 
        "Kochi, Kerala", 
        "Indore, Madhya Pradesh", 
        "Coimbatore, Tamil Nadu",
        "Gurgaon, Haryana",
        "Noida, Uttar Pradesh",
        "Other"
    ];
    
    // Industry options
    const industries = [
        "Technology", 
        "IT Services",
        "E-commerce", 
        "Healthcare", 
        "Finance", 
        "Education", 
        "Manufacturing",
        "Retail", 
        "Telecom",
        "Consulting",
        "FMCG",
        "Other"
    ];
    
    // Employment types
    const employmentTypes = [
        "Full-time", 
        "Part-time", 
        "Contract", 
        "Temporary", 
        "Internship", 
        "Remote"
    ];

    // Handle location selection
    const handleLocationChange = (e) => {
        const selectedValue = e.target.value;
        setLocation(selectedValue);
        
        if (selectedValue === "Other") {
            setShowCustomLocation(true);
            setLocation('');
        } else {
            setShowCustomLocation(false);
            setCustomLocation('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Use custom location if "Other" is selected
        const finalLocation = location || customLocation;
        
        const jobData = {
            title,
            company,
            location: finalLocation,
            description,
            requirements: requirements.split('\n').map(r => r.trim()).filter(Boolean),
            salary: { min: Number(salaryMin), max: Number(salaryMax) },
            skills: skills.split(',').map(s => s.trim()).filter(Boolean),
            industry: selectedIndustry,
            employmentType
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
        <form onSubmit={handleSubmit} className="job-form">
            <h2>{job ? 'Edit Job Listing' : 'Post a New Job'}</h2>

            <div className="form-section">
                <h3>Job Details</h3>
                <div>
                    <label>Job Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                
                <div>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
                </div>
                
                <div>
                    <label>Industry:</label>
                    <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}>
                        {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label>Employment Type:</label>
                    <select value={employmentType} onChange={e => setEmploymentType(e.target.value)}>
                        {employmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Location:</label>
                    <select value={location} onChange={handleLocationChange}>
                        <option value="">-- Select Location --</option>
                        {indianLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                {showCustomLocation && (
                    <div>
                        <label>Specify Location:</label>
                        <input 
                            type="text" 
                            value={customLocation} 
                            onChange={e => setCustomLocation(e.target.value)}
                            placeholder="Enter city, state"
                            required 
                        />
                    </div>
                )}
            </div>

            <div className="form-section">
                <h3>Job Description</h3>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        rows="6"
                        required 
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>Requirements & Skills</h3>
                <div>
                    <label>Requirements (one per line):</label>
                    <textarea 
                        value={requirements} 
                        onChange={e => setRequirements(e.target.value)} 
                        rows="4"
                        required 
                    />
                </div>
                
                <div>
                    <label>Skills (comma separated):</label>
                    <input 
                        type="text" 
                        value={skills} 
                        onChange={e => setSkills(e.target.value)}
                        placeholder="JavaScript, React, Node.js, etc." 
                        required 
                    />
                </div>
            </div>

            <div className="form-section">
                <h3>Compensation</h3>
                <div className="salary-inputs">
                    <div>
                        <label>Minimum Salary (₹):</label>
                        <input 
                            type="number" 
                            value={salaryMin} 
                            onChange={e => setSalaryMin(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Maximum Salary (₹):</label>
                        <input 
                            type="number" 
                            value={salaryMax} 
                            onChange={e => setSalaryMax(e.target.value)} 
                            required 
                        />
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="primary-btn">
                    {job ? 'Update Job' : 'Post Job'}
                </button>
            </div>
        </form>
    );
};

export default JobForm;