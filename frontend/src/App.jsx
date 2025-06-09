import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Candidates from './pages/Candidates';

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
  };

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
              
              {isAuthenticated && userRole === 'employer' && (
                <li><Link to="/candidates">Candidates</Link></li>
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
            <Route path="/" exact component={Home} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/login">
              <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
            </Route>
            <Route path="/register" component={Register} />
            <Route path="/candidates" component={Candidates} />
            <Route path="/post-job">
              {isAuthenticated && userRole === 'employer' ? 
                <JobForm onSubmit={() => {}} /> : 
                <Redirect to="/login" />
              }
            </Route>
            <Route path="/applications">
              {isAuthenticated && userRole === 'candidate' ? 
                <ApplicationTracker /> : 
                <Redirect to="/login" />
              }
            </Route>
            <Route path="/profile">
              {isAuthenticated ? 
                <Profile /> : 
                <Redirect to="/login" />
              }
            </Route>
            <Route path="/analytics">
              {isAuthenticated ? 
                <AnalyticsDashboard /> : 
                <Redirect to="/login" />
              }
            </Route>
          </Switch>
        </main>
        
        <footer className="app-footer">
          
        </footer>
      </div>
    </Router>
  );
}

export default App;