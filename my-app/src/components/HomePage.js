import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomePage.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ email }) => {
  const [creatorTeams, setCreatorTeams] = useState([]);
  const [memberTeams, setMemberTeams] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the user's teams when the component mounts
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auth/teams-by-email/${email}`);
        setCreatorTeams(response.data.creatorTeams);
        setMemberTeams(response.data.memberTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [email]);

  // Function to handle team box click
  const handleTeamClick = (teamName) => {
    // Navigate to the team page using the teamName
    navigate(`/team/${teamName}`);
  };

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

        <div className="team-list">
          {creatorTeams.map((teamName) => (
            <div key={teamName} className="team-box creator" onClick={() => handleTeamClick(teamName)}>
              <h3>{teamName}</h3>
              <p>You are the creator</p>
            </div>
          ))}

          {memberTeams.map((teamName) => (
            <div key={teamName} className="team-box member" onClick={() => handleTeamClick(teamName)}>
              <h3>{teamName}</h3>
              <p>You are a member</p>
            </div>
          ))}

          {creatorTeams.length === 0 && memberTeams.length === 0 && (
            <p>You are not a member of any teams.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
