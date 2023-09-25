import React from 'react';

const HomePage = ({ email }) => {
  return (
    <div className="homepage">
      <nav className="navbar" style={{ backgroundColor: '#333', color: 'white' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/teams" style={{ textDecoration: 'none', color: 'white' }}>Teams</a></li>
          <li><a href="/logout" style={{ textDecoration: 'none', color: 'white' }}>Log Out</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to the Homepage!</h1>
        <p>This is a simple homepage created using React.</p>
        <p>Welcome, {email}!</p> {/* Display the user's email */}
      </div>
    </div>
  );
};

export default HomePage;
