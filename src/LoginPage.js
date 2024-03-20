// src/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

import './css/LoginPage.css';

function LoginPage({ setAuthenticated, setAuthToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate  = useNavigate ();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post("http://localhost:3000/api/user/login",{
        email:username,password
      });
      setAuthenticated(true);
      setAuthToken(response.data.accessToken)
      sessionStorage.setItem('user', JSON.stringify(response.data));

      navigate('/profile');
    } catch (error) {
      setError('Invalid username or password'); 
     
      setTimeout(() => {
        setError('');
      }, 5000);

    }finally{
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
