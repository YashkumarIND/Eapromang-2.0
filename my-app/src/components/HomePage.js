import React from 'react';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = ({ email }) => {
  return (
    <div className="homepage-container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/create-teams">Create Teams</Link></li>
          <li><Link to="/logout">Log Out</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to the Homepage!</h1>
        <p>This is a simple homepage created using React.</p>
        <p>Welcome, {email}!</p>
      </div>
    </div>
  );
};

export default HomePage;
