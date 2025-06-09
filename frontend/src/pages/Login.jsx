import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../services/api';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', user.role);
            
            if (user.role === 'candidate') {
                localStorage.setItem('candidateId', user._id);
            }
            
            setIsAuthenticated(true);
            setUserRole(user.role);
            history.push('/');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;