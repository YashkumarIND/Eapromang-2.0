import React, { useState } from 'react';
import '../css/LoginForm.css';
import axios from 'axios'; // Import Axios

const API_BASE_URL = 'http://localhost:3001/api/auth'; // Adjust the URL to match your server

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      // Assuming your server returns a JWT upon successful login
      const { token } = response.data;

      // Store the token in localStorage or a secure storage mechanism
      localStorage.setItem('authToken', token);

      // Update the state to indicate authentication
      setIsAuthenticated(true);
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error('Login failed:', error);
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
