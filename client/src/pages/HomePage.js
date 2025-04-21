// client/src/pages/Home/Home.js
import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>FinTrack</div>
        <div style={styles.navButtons}>
          <Link to="/login" style={styles.navButton}>
            Login
          </Link>
          <Link to="/register" style={styles.navButtonPrimary}>
            Register
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heading}>Your Personal Finance Tracker!</h1>
        <p style={styles.subheading}>
          Take control of your financial future with our intuitive platform that helps you track, 
          analyze, and optimize your spending habits.
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/register" style={styles.primaryButton}>
            Get Started
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.sectionHeading}>Features That Make Us Special</h2>
        
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" style={styles.svg}>
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Expense Tracking</h3>
            <p style={styles.featureDescription}>
              Easily record and categorize your daily expenses to gain insights into your spending patterns.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" style={styles.svg}>
                <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Budget Planning</h3>
            <p style={styles.featureDescription}>
              Create customized budgets for different expense categories and track your progress in real-time.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogoText}>FinTrack</div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </div>
      </footer>
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
    backgroundColor: '#f8f9fa',
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
  navButtons: {
    display: 'flex',
    gap: '1rem',
  },
  navButton: {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: '#0056b3',
    fontWeight: '500',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  navButtonPrimary: {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    backgroundColor: '#0056b3',
    color: 'white',
    fontWeight: '500',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  heroSection: {
    marginTop: '70px',
    padding: '7rem 5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0062cc 0%, #007bff 100%)',
    color: 'white',
    minHeight: '50vh',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'white',
  },
  subheading: {
    fontSize: '1.25rem',
    maxWidth: '800px',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'white',
    color: '#007bff',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  featuresSection: {
    padding: '5rem 5%',
    backgroundColor: 'white',
  },
  sectionHeading: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#007bff',
  },
  featuresGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    flex: '1 1 300px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  svg: {
    fill: 'none',
    stroke: '#007bff',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#333',
  },
  featureDescription: {
    color: '#666',
    lineHeight: '1.6',
  },
  footer: {
    padding: '4rem 5% 2rem',
    backgroundColor: '#0062cc',
    color: '#f8f9fa',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerLogoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f8f9fa',
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '1.5rem',
    textAlign: 'center',
    color: '#b8daff',
    fontSize: '0.9rem',
  },
};

export default Home;
