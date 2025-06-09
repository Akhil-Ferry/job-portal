import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Job Portal</h1>
            <p>Your one-stop solution for finding jobs and hiring candidates.</p>
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>Search for jobs by title, location, and skills.</li>
                    <li>Create and manage your candidate profile.</li>
                    <li>Employers can post job listings and track applications.</li>
                    <li>Analytics dashboard for insights on job trends.</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;