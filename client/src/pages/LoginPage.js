import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Login failed; update error state and remain on login page.
        setError(data.message || 'Invalid username or password');
      } else {
        // Login succeeded; clear any error and navigate.
        setError('');
        console.log('Login successful:', data);
        navigate('/items');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>FinTrack</div>
      </nav>

      <div style={styles.heroSection}>
        <h2 style={styles.heading}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p>Already have an account? <Link to="/register" style={styles.link}>Register here</Link></p>
      </div>

      

      {/* <footer style={styles.footer}>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
    color: '#333',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #0062cc 0%, #007bff 100%)',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 5%',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  heroSection: {
    marginTop: '70px',
    padding: '4rem 5%',  /* Reduced padding for a smaller hero section */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0062cc 0%, #007bff 100%)',
    color: 'white',
    minHeight: '40vh',    /* Reduced minimum height */
  },
  heading: {
    fontSize: '2.5rem',  /* Reduced the font size slightly */
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  input: {
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',  // Removed the border property
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '0.9rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    padding: '2rem 5%',
    backgroundColor: '#0062cc',
    color: 'white',
    textAlign: 'center',
  },
  copyright: {
    fontSize: '0.9rem',
  },
};

export default Login;
