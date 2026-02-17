import React from 'react';
import '../shared/styles/style.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        
        <div className="footer-section">
          <p className="copyright">© {currentYear} WeatherApp by PavelShap</p>
          <div className="system-status">
            <span className="status-dot"></span>
            System Operational
          </div>
        </div>

        
        <div className="footer-section">
          <p className="data-source">
            Data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">WeatherAPI</a>
          </p>
        </div>

        
        <div className="footer-section social-links">
          <a href="https://github.com/PavloShaparenko" target="_blank" className="social-icon">GitHub</a>
          <a href="https://www.linkedin.com/in/pawe%C5%82-szaparenko-a3bb9632b/" target="_blank" className="social-icon">LinkedIn</a>
          <a href="https://t.me/P2velShap" className="social-icon" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;