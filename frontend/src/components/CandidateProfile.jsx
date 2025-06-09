import React, { useState, useEffect } from 'react';
import { getUserProfile, updateCandidateProfile } from '../services/api';

const CandidateProfile = () => {
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidateProfile = async () => {
            try {
                const data = await getUserProfile();
                setCandidate(data);
            } catch (err) {
                setError('Error fetching candidate profile');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidateProfile();
    }, []);

    const handleUpdate = async (updatedProfile) => {
        try {
            await updateCandidateProfile(candidate._id, updatedProfile);
            setCandidate(updatedProfile);
        } catch (err) {
            setError('Error updating candidate profile');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Candidate Profile</h2>
            {candidate && (
                <div>
                    <h3>{candidate.name}</h3>
                    <p>Email: {candidate.email}</p>
                    <p>Skills: {candidate.skills.join(', ')}</p>
                    <p>Education: {candidate.education}</p>
                    <p>Experience: {candidate.experience}</p>
                    <button onClick={() => handleUpdate(candidate)}>Update Profile</button>
                </div>
            )}
            <ul>
                {candidate && candidate.map(candidate => (
                    <li key={candidate._id}>
                        <h2>{candidate.name}</h2>
                        <p>Skills: {candidate.skills.join(', ')}</p>
                        <p>Experience: {candidate.experience}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateProfile;