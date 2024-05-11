import React from 'react';
import './Footer.css'

interface FooterProps {
  githubUrl: string;
}

const Footer: React.FC<FooterProps> = ({ githubUrl }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span> {new Date().getFullYear()} DRM system using Zama's fhEVM</span>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
