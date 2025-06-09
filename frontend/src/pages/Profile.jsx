import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <h2>{profile.name}</h2>
                    <p>Email: {profile.email}</p>
                    <p>Skills: {profile.skills.join(', ')}</p>
                    <p>Education: {profile.education}</p>
                    <p>Experience: {profile.experience}</p>
                </div>
            ) : (
                <p>No profile found.</p>
            )}
        </div>
    );
};

export default Profile;