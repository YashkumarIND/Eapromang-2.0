import React, { useState } from 'react';
import axios from 'axios';

const CreateTeamForm = ({creatorEmail}) => {
  const [projectName, setProjectName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTeamMember, setNewTeamMember] = useState('');

  const handleAddTeamMember = () => {
    if (newTeamMember.trim() !== '') {
      setTeamMembers([...teamMembers, newTeamMember]);
      setNewTeamMember('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to your server's team creation endpoint
      const response = await axios.post('http://localhost:3001/api/auth/teams', {
        projectName,
        teamMembers,
        creator: creatorEmail, // Use creatorEmail directly from props
      });
  
      console.log('Team added successfully:', response.data);
  
      // Clear the form
      setProjectName('');
      setTeamMembers([]);
      setNewTeamMember('');
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Create a New Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Team Members:</label>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newTeamMember}
              onChange={(e) => setNewTeamMember(e.target.value)}
            />
            <button type="button" onClick={handleAddTeamMember}>
              Add Team Member
            </button>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTeamForm;
