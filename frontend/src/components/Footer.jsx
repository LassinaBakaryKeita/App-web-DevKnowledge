import './Footer.css';
import { Link } from "react-router-dom";
import { FaTiktok, FaFacebook,FaGithub, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">⚡</div>
            <span className="footer-logo-text">Dev<span>Knowledge</span></span>
          </Link>

          <p className="footer-desc">
            The platform where software engineers share real expertise practical, in-depth, and peer-reviewed by the community.
          </p>

          <div className="footer-socials">
            <a href="https://www.tiktok.com/@lassina.bakary.ke" className="footer-social-link" aria-label="TikTok" target='_blank'  rel="noopener noreferrer">  <FaTiktok /></a>
            <a href="https://github.com/LassinaBakaryKeita" className="footer-social-link" aria-label="GitHub" target='_blank'  rel="noopener noreferrer"> <FaGithub /> </a>
            <a href="https://www.facebook.com/lassina.bakary.keita" className="footer-social-link" aria-label="Facebook" target='_blank'  rel="noopener noreferrer"><FaFacebook/> </a>
            <a href="https://www.linkedin.com/in/lassina-bakary-ke%C3%AFta-b28626370/" className="footer-social-link" aria-label="LinkedIn" target='_blank'  rel="noopener noreferrer"> <FaLinkedinIn />  </a>
          </div>
            
        </div>

        {/* Platform links */}
        <div className="footer-col">
          <div className="footer-col-title">Platform</div>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/Blog" className="footer-link">Blog</Link>

            <a href="#" className="footer-link">Browse Articles</a>
             <a href="#" className="footer-link">Trending</a>
            <a href="#" className="footer-link">Topics</a>
           
          </div>
        </div>

        {/* Account links */}
        <div className="footer-col">
          <div className="footer-col-title">Account</div>
          <div className="footer-links">
            <Link to="/login" className="footer-link">Log in</Link>
            <Link  to="/login?mode=register" className="footer-link">Sign up</Link>
            <a href="#" className="footer-link">Dashboard</a>
            <a href="#" className="footer-link">Write an Article</a>
          </div>
        </div>

        {/* Company links */}
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <div className="footer-links">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Use</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © {currentYear} DevKnowledge. All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy</a>
          <a href="#" className="footer-bottom-link">Terms</a>
          <a href="#" className="footer-bottom-link">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;