import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { API_URL } from '../services/api';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState({
        jobsPerLocation: [],
        inDemandSkills: [],
        averageSalary: [],
        jobsOverTime: []
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeFilter, setTimeFilter] = useState('all'); // 'week', 'month', 'year', 'all'

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                
                const response = await axios.get(`${API_URL}/jobs/analytics?timeframe=${timeFilter}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setAnalyticsData(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setError('Failed to load analytics data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, [timeFilter]);

    // Generate colors for charts
    const generateColors = (count) => {
        const colors = [
            'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 
            'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)', 'rgba(83, 102, 255, 0.6)',
            'rgba(78, 205, 196, 0.6)', 'rgba(255, 99, 71, 0.6)'
        ];
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    };

    const renderJobsPerLocationChart = () => {
        if (!analyticsData.jobsPerLocation?.length) 
            return <div className="no-data">No location data available</div>;

        const labels = analyticsData.jobsPerLocation.map(item => item._id);
        const dataVals = analyticsData.jobsPerLocation.map(item => item.count);
        const backgroundColor = generateColors(labels.length);

        const data = {
            labels,
            datasets: [
                {
                    label: 'Jobs Posted per Location',
                    data: dataVals,
                    backgroundColor,
                    borderColor: backgroundColor.map(color => color.replace('0.6', '1')),
                    borderWidth: 1
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Job Distribution by Location' }
            }
        };

        return <Bar data={data} options={options} />;
    };

    const renderInDemandSkillsChart = () => {
        if (!analyticsData.inDemandSkills?.length) 
            return <div className="no-data">No skills data available</div>;

        const labels = analyticsData.inDemandSkills.map(item => item._id);
        const dataVals = analyticsData.inDemandSkills.map(item => item.count);
        const backgroundColor = generateColors(labels.length);

        const data = {
            labels,
            datasets: [
                {
                    label: 'Demand Count',
                    data: dataVals,
                    backgroundColor,
                    borderColor: backgroundColor.map(color => color.replace('0.6', '1')),
                    borderWidth: 1
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Most In-Demand Skills' }
            }
        };

        return <Doughnut data={data} options={options} />;
    };

    const renderSalaryAnalysisChart = () => {
        if (!analyticsData.averageSalary?.length) 
            return <div className="no-data">No salary data available</div>;
        
        const labels = analyticsData.averageSalary.map(item => item._id);
        const minSalaryData = analyticsData.averageSalary.map(item => item.avgMinSalary);
        const maxSalaryData = analyticsData.averageSalary.map(item => item.avgMaxSalary);
        
        const data = {
            labels,
            datasets: [
                {
                    label: 'Avg Min Salary',
                    data: minSalaryData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Avg Max Salary',
                    data: maxSalaryData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }
            ],
        };
        
        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Salary (USD)'
                    }
                }
            },
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Average Salary by Job Title' }
            }
        };
        
        return <Bar data={data} options={options} />;
    };

    const renderJobsOverTimeChart = () => {
        if (!analyticsData.jobsOverTime?.length) 
            return <div className="no-data">No time-based data available</div>;
        
        // Format the date labels
        const labels = analyticsData.jobsOverTime.map(item => {
            const month = item._id.month;
            const year = item._id.year;
            return `${month}/${year}`;
        });
        
        const dataValues = analyticsData.jobsOverTime.map(item => item.count);
        
        const data = {
            labels,
            datasets: [
                {
                    label: 'Jobs Posted',
                    data: dataValues,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
        
        const options = {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Job Posting Trends' }
            }
        };
        
        return <Line data={data} options={options} />;
    };

    if (loading) return (
        <div className="analytics-loading">
            <div className="spinner"></div>
            <p>Loading analytics data...</p>
        </div>
    );

    if (error) return (
        <div className="analytics-error">
            <p>{error}</p>
            <button onClick={() => setTimeFilter(timeFilter)}>Retry</button>
        </div>
    );

    return (
        <div className="analytics-dashboard">
            <div className="analytics-header">
                <h1>Analytics Dashboard</h1>
                <div className="filters">
                    <label>Time Period:</label>
                    <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                        <option value="all">All Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="year">Past Year</option>
                    </select>
                </div>
            </div>
            
            <div className="analytics-summary">
                <div className="summary-card">
                    <h3>Total Jobs</h3>
                    <p className="summary-number">
                        {analyticsData.jobsPerLocation?.reduce((sum, item) => sum + item.count, 0) || 0}
                    </p>
                </div>
                <div className="summary-card">
                    <h3>Unique Skills</h3>
                    <p className="summary-number">{analyticsData.inDemandSkills?.length || 0}</p>
                </div>
                <div className="summary-card">
                    <h3>Locations</h3>
                    <p className="summary-number">{analyticsData.jobsPerLocation?.length || 0}</p>
                </div>
                <div className="summary-card">
                    <h3>Avg. Salary Range</h3>
                    <p className="summary-number">
                        ${analyticsData.averageSalary && analyticsData.averageSalary.length > 0
                            ? Math.round(analyticsData.averageSalary.reduce((acc, val) => acc + val.avgMinSalary, 0) / analyticsData.averageSalary.length).toLocaleString()
                            : 0}
                        {" - "}
                        ${analyticsData.averageSalary && analyticsData.averageSalary.length > 0
                            ? Math.round(analyticsData.averageSalary.reduce((acc, val) => acc + val.avgMaxSalary, 0) / analyticsData.averageSalary.length).toLocaleString()
                            : 0}
                    </p>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card">
                    <h2>Jobs by Location</h2>
                    {renderJobsPerLocationChart()}
                </div>
                <div className="chart-card">
                    <h2>In-Demand Skills</h2>
                    {renderInDemandSkillsChart()}
                </div>
                <div className="chart-card">
                    <h2>Salary Analysis</h2>
                    {renderSalaryAnalysisChart()}
                </div>
                <div className="chart-card">
                    <h2>Jobs Over Time</h2>
                    {renderJobsOverTimeChart()}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;