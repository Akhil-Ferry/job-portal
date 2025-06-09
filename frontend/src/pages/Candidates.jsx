import React, { useEffect, useState } from 'react';
import { fetchCandidates } from '../services/api';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const data = await fetchCandidates();
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        getCandidates();
    }, []);

    return (
        <div>
            <h1>Candidates</h1>
            <ul>
                {candidates.map(candidate => (
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

export default Candidates;