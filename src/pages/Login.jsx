import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = { username, password };

      const response = await axios.post('http://localhost:8080/auth/login', data);

      if (response.status === 200 || response.status === 302) {
        // ✅ Correct credentials
        setIsLoggedIn(true);
        navigate('/');
      } else {
        // ❌ Wrong credentials
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-background">
      <div className="login-form">
        <h2>USER LOGIN</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
