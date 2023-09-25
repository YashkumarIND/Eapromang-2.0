import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage email={userEmail} />} />
          <Route path="/" element={<LoginForm setUserEmail={setUserEmail} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
