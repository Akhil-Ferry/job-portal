import React, { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { fetchJobs } from '../services/api';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getJobs = async () => {
            try {
                const jobData = await fetchJobs();
                setJobs(jobData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Job Listings</h1>
            <JobList jobs={jobs} />
        </div>
    );
};

export default Jobs;