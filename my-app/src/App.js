import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import CreateTeamForm from './components/CreateTeamForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create-teams" element={<CreateTeamForm creatorEmail={userEmail} />} exact />
          <Route path="/home" element={<HomePage email={userEmail} />} exact />
          <Route path="/" element={<LoginForm setUserEmail={setUserEmail} />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
