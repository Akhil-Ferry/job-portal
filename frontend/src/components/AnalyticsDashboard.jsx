import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { API_URL } from '../services/api';

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState({
        jobsPerIndustry: {},
        inDemandSkills: {},
        averageSalary: {},
        applicationTrends: {},
    });

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get(`${API_URL}/jobs/analytics/summary`);
                setAnalyticsData(response.data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, []);

    const renderJobsPerIndustryChart = () => {
        const labels = analyticsData.jobsPerLocation?.map(item => item._id) || [];
        const dataVals = analyticsData.jobsPerLocation?.map(item => item.count) || [];
        const data = {
            labels,
            datasets: [
                {
                    label: 'Jobs Posted per Location',
                    data: dataVals,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };
        return <Bar data={data} />;
    };

    const renderInDemandSkillsChart = () => {
        const labels = analyticsData.inDemandSkills?.map(item => item._id) || [];
        const dataVals = analyticsData.inDemandSkills?.map(item => item.count) || [];
        const data = {
            labels,
            datasets: [
                {
                    label: 'Most In-Demand Skills',
                    data: dataVals,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
            ],
        };
        return <Bar data={data} />;
    };

    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <div>
                <h2>Jobs Posted per Industry</h2>
                {renderJobsPerIndustryChart()}
            </div>
            <div>
                <h2>Most In-Demand Skills</h2>
                {renderInDemandSkillsChart()}
            </div>
            {/* Additional charts for average salary and application trends can be added here */}
        </div>
    );
};

export default AnalyticsDashboard;