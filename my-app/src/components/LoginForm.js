import React, { useState } from 'react';
import '../css/LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001/api/auth';

const LoginForm = ({ setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      // Set the email state
      setEmail(email);

      // Update the state to indicate authentication
      setIsAuthenticated(true);

      // Call the setUserEmail function to set the user's email
      setUserEmail(email);

      // Redirect to the homepage
      navigate('/home'); // Redirect to "/home" route
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Login failed: Invalid email or password');
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <div className="login-form">
      {isAuthenticated ? (
        <div className="welcome-message">
          <p>Welcome, {email}!</p>
        </div>
      ) : (
        <form>
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
