import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

// Job-related API calls
export const fetchJobs = async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
};

export const updateJob = async (jobId, jobData) => {
    const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData);
    return response.data;
};

export const deleteJob = async (jobId) => {
    const response = await axios.delete(`${API_URL}/jobs/${jobId}`);
    return response.data;
};

// Candidate-related API calls
export const fetchCandidates = async () => {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
};

export const createCandidateProfile = async (candidateData) => {
    const response = await axios.post(`${API_URL}/candidates`, candidateData);
    return response.data;
};

export const updateCandidateProfile = async (candidateId, candidateData) => {
    const response = await axios.put(`${API_URL}/candidates/${candidateId}`, candidateData);
    return response.data;
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/candidates/profile`, {
        headers: { Authorization: token }
    });
    return response.data;
};

// Application-related API calls
export const applyForJob = async (applicationData) => {
    const response = await axios.post(`${API_URL}/applications`, applicationData);
    return response.data;
};

export const fetchApplications = async (candidateId) => {
    const response = await axios.get(`${API_URL}/applications?candidateId=${candidateId}`);
    return response.data;
};