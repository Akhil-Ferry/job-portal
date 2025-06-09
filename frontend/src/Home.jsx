import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Job Portal System</h1>
      <p>Find your dream job or the perfect candidate</p>
      
      <div className="home-actions">
        <Link to="/jobs">
          <button>Browse Jobs</button>
        </Link>
        <Link to="/register">
          <button>Get Started</button>
        </Link>
      </div>
      
      <div className="features">
        <h2>Features</h2>
        <div className="feature-items">
          <div className="feature">
            <h3>For Job Seekers</h3>
            <ul>
              <li>Create detailed candidate profiles</li>
              <li>Search for relevant jobs</li>
              <li>Track application status</li>
            </ul>
          </div>
          <div className="feature">
            <h3>For Employers</h3>
            <ul>
              <li>Post job listings</li>
              <li>Find qualified candidates</li>
              <li>Analyze hiring metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;