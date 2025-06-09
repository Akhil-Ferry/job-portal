import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Profile from './pages/Profile';

// Import components
import JobForm from './components/JobForm';
import ApplicationTracker from './components/ApplicationTracker';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('candidateId');
    setIsAuthenticated(false);
    setUserRole('');
    window.location.href = '/';
  };

  // Placeholder for home page
  const HomePage = () => (
    <div className="home">
      <h1>Welcome to Job Portal System</h1>
      <p>Find your dream job or the perfect candidate</p>
    </div>
  );

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <h1>Job Portal</h1>
          </div>
          <nav className="app-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              {isAuthenticated && userRole === 'employer' && (
                <li><Link to="/post-job">Post Job</Link></li>
              )}
              {isAuthenticated && userRole === 'candidate' && (
                <li><Link to="/applications">My Applications</Link></li>
              )}
              {isAuthenticated && (
                <li><Link to="/profile">Profile</Link></li>
              )}
              {isAuthenticated && (
                <li><Link to="/analytics">Analytics</Link></li>
              )}
              {!isAuthenticated ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              ) : (
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
              )}
            </ul>
          </nav>
        </header>

        <main className="app-main">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/login" render={() => isAuthenticated ? <Redirect to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
            <Route path="/register" render={() => isAuthenticated ? <Redirect to="/" /> : <Register />} />
            <Route path="/candidates" component={Candidates} />
            <Route path="/post-job" render={() => isAuthenticated && userRole === 'employer' ? <JobForm onSubmit={() => window.location.href = '/jobs'} /> : <Redirect to="/login" />} />
            <Route path="/applications" render={() => isAuthenticated && userRole === 'candidate' ? <ApplicationTracker /> : <Redirect to="/login" />} />
            <Route path="/profile" render={() => isAuthenticated ? <Profile /> : <Redirect to="/login" />} />
            <Route path="/analytics" render={() => isAuthenticated ? <AnalyticsDashboard /> : <Redirect to="/login" />} />
          </Switch>
        </main>

        <footer className="app-footer">
          <p>&copy; 2023 Job Portal System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;