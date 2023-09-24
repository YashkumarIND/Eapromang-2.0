// App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // State for user's email

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage email={userEmail} /> : <LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />}
        />
        <Route
          path="/"
          element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />}
        />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
