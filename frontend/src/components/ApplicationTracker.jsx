import React, { useEffect, useState } from 'react';
import { fetchApplications } from '../services/api';

const ApplicationTracker = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const candidateId = localStorage.getItem('candidateId');
        if (!candidateId) {
            setError('User not authenticated. Please login again.');
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                const data = await fetchApplications(candidateId);
                setApplications(data);
            } catch (err) {
                setError('Failed to load your applications');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredApplications = filterStatus === 'all' 
        ? applications 
        : applications.filter(app => app.status === filterStatus);

    const getStatusClass = (status) => {
        switch(status.toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'reviewing': return 'status-reviewing';
            case 'interviewed': return 'status-interviewed';
            case 'accepted': return 'status-accepted';
            case 'rejected': return 'status-rejected';
            default: return '';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) return <div className="loading">Loading your applications...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="application-tracker">
            <h1>Your Job Applications</h1>
            
            <div className="filter-container">
                <label htmlFor="status-filter">Filter by status: </label>
                <select 
                    id="status-filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            
            {filteredApplications.length === 0 ? (
                <div className="no-applications">
                    {applications.length === 0 
                        ? "You haven't applied to any jobs yet." 
                        : "No applications match the selected filter."}
                </div>
            ) : (
                <div className="applications-table-container">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Applied On</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((application) => (
                                <tr key={application._id}>
                                    <td>{application.job?.title || 'Unknown Job'}</td>
                                    <td>{application.job?.company || 'Unknown Company'}</td>
                                    <td>{formatDate(application.appliedDate)}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(application.updatedAt || application.appliedDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicationTracker;