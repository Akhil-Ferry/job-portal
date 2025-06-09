import React, { useState, useEffect } from 'react';
import { fetchJobs, applyForJob } from '../services/api';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Search and filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('All Locations');
    const [customLocation, setCustomLocation] = useState('');
    const [industry, setIndustry] = useState('All Industries');
    const [employmentType, setEmploymentType] = useState('All Types');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showCustomLocation, setShowCustomLocation] = useState(false);

    // Indian locations for dropdown
    const indianLocations = [
        "All Locations",
        "Bangalore, Karnataka", 
        "Mumbai, Maharashtra", 
        "Delhi NCR", 
        "Hyderabad, Telangana", 
        "Chennai, Tamil Nadu",
        "Pune, Maharashtra", 
        "Kolkata, West Bengal", 
        "Ahmedabad, Gujarat", 
        "Other"
    ];
    
    // Industry options
    const industries = [
        "All Industries", 
        "Technology", 
        "IT Services",
        "E-commerce", 
        "Healthcare", 
        "Finance", 
        "Education", 
        "Manufacturing"
    ];
    
    // Employment types
    const employmentTypes = [
        "All Types", 
        "Full-time", 
        "Part-time", 
        "Contract", 
        "Internship", 
        "Remote"
    ];

    // Handle location selection
    const handleLocationChange = (e) => {
        const selectedValue = e.target.value;
        
        if (selectedValue === "Other") {
            setShowCustomLocation(true);
            setLocation('');
        } else {
            setShowCustomLocation(false);
            setCustomLocation('');
            setLocation(selectedValue);
        }
    };

    useEffect(() => {
        const fetchJobsData = async () => {
            try {
                setLoading(true);
                const queryParams = new URLSearchParams();
                
                if (searchTerm) queryParams.append('search', searchTerm);
                
                // Use either selected location or custom location
                const finalLocation = location === "All Locations" ? '' : (location || customLocation);
                if (finalLocation) queryParams.append('location', finalLocation);
                
                if (industry && industry !== 'All Industries') queryParams.append('industry', industry);
                if (employmentType && employmentType !== 'All Types') queryParams.append('employmentType', employmentType);
                if (minSalary) queryParams.append('minSalary', minSalary);
                if (maxSalary) queryParams.append('maxSalary', maxSalary);
                queryParams.append('page', currentPage);
                queryParams.append('limit', 10);
                
                const data = await fetchJobs(`?${queryParams.toString()}`);
                
                setJobs(data.jobs || data);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError('Failed to load jobs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobsData();
    }, [searchTerm, location, customLocation, industry, employmentType, minSalary, maxSalary, currentPage]);

    const handleApply = async (jobId) => {
        try {
            const candidateId = localStorage.getItem('candidateId');
            if (!candidateId) {
                alert('Please login as a candidate to apply for jobs');
                return;
            }
            
            await applyForJob({
                jobId,
                candidateId,
                appliedDate: new Date(),
                status: 'pending'
            });
            
            alert('Application submitted successfully!');
        } catch (err) {
            alert('Failed to apply for this job. Please try again.');
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('All Locations');
        setCustomLocation('');
        setShowCustomLocation(false);
        setIndustry('All Industries');
        setEmploymentType('All Types');
        setMinSalary('');
        setMaxSalary('');
        setCurrentPage(1);
    };

    return (
        <div className="jobs-page">
            <h1>Job Listings</h1>
            
            <div className="search-filters">
                <form onSubmit={handleSearch}>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Job title, skills, or keywords..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </div>
                    
                    <div className="filters-grid">
                        <div className="filter-item">
                            <label>Location:</label>
                            <select 
                                value={location}
                                onChange={handleLocationChange}
                            >
                                {indianLocations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                            
                            {showCustomLocation && (
                                <input 
                                    type="text" 
                                    value={customLocation}
                                    onChange={(e) => setCustomLocation(e.target.value)}
                                    placeholder="Enter custom location"
                                    className="mt-2"
                                />
                            )}
                        </div>
                        
                        <div className="filter-item">
                            <label>Industry:</label>
                            <select 
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                {industries.map(ind => (
                                    <option key={ind} value={ind}>{ind}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="filter-item">
                            <label>Employment Type:</label>
                            <select 
                                value={employmentType}
                                onChange={(e) => setEmploymentType(e.target.value)}
                            >
                                {employmentTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="filter-item">
                            <label>Salary Range (₹):</label>
                            <div className="salary-range">
                                <input 
                                    type="number" 
                                    value={minSalary}
                                    onChange={(e) => setMinSalary(e.target.value)}
                                    placeholder="Min"
                                />
                                <span>to</span>
                                <input 
                                    type="number" 
                                    value={maxSalary}
                                    onChange={(e) => setMaxSalary(e.target.value)}
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="filter-actions">
                        <button type="submit" className="primary-btn">Apply Filters</button>
                        <button type="button" onClick={handleClearFilters} className="secondary-btn">Clear Filters</button>
                    </div>
                </form>
            </div>
            
            {loading ? (
                <div className="loading">Loading jobs...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : jobs.length === 0 ? (
                <div className="no-results">No jobs found matching your criteria.</div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map(job => (
                        <div key={job._id} className="job-card">
                            <h2 className="job-title">{job.title}</h2>
                            <div className="job-company">{job.company}</div>
                            <div className="job-location">{job.location}</div>
                            <div className="job-salary">
                                ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                            </div>
                            <div className="job-description">{job.description.substring(0, 150)}...</div>
                            
                            <div className="job-requirements">
                                <h4>Requirements:</h4>
                                <ul>
                                    {job.requirements?.slice(0, 3).map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                    {job.requirements?.length > 3 && <li>...and more</li>}
                                </ul>
                            </div>
                            
                            <button 
                                className="apply-btn"
                                onClick={() => handleApply(job._id)}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    
                    <span className="page-indicator">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Jobs;