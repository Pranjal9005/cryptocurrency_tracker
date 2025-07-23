import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] && users[email] === password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', email);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="auth-error">{error}</div>}
      <button
        type="button"
        style={{ marginTop: '1rem', background: '#eee', color: '#222' }}
        onClick={() => window.location.href = '/register'}
      >
        Register Now
      </button>
    </div>
  );
} 
   