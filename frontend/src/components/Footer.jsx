import './Footer.css';
import { Link } from 'react-router-dom';
import { Zap, MessageSquare, ArrowUpRight, BookOpen, PenSquare } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="section-divider-line section-divider-top" />

      <div className="container footer-container">
        
        {/* Top multi-column */}
        <div className="footer-top-grid">
          
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Zap size={18} strokeWidth={2.5} />
              </div>
              <span className="footer-logo-text">Dev<span className="logo-gradient">Knowledge</span></span>
            </Link>
            
            <p className="footer-mission-text">
              The community-driven platform where software engineers share real architectural lessons, code discoveries, and technical breakdowns.
            </p>

            <div className="footer-social-row">
              <a
                href="https://github.com/LassinaBakaryKeita"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/lassina-bakary-ke%C3%AFta-b28626370/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/blog">All Technical Articles</Link></li>
              <li><Link to="/createArticle">Contribute Knowledge</Link></li>
              <li><Link to="/myArticles">Author Dashboard</Link></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Topics</h4>
            <ul className="footer-links-list">
              <li><Link to="/blog">Distributed Systems</Link></li>
              <li><Link to="/blog">TypeScript & React</Link></li>
              <li><Link to="/blog">Backend Architecture</Link></li>
              <li><Link to="/blog">DevOps & Cloud</Link></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Account</h4>
            <ul className="footer-links-list">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/login?mode=register">Join Community</Link></li>
              <li><Link to="/createArticle">Draft an Article</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy-text">
            &copy; {currentYear} DevKnowledge. Designed for the global software engineering community.
          </div>
          <div className="footer-legal-links">
            <span className="footer-legal-tag">100% Open & Community Focused</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;