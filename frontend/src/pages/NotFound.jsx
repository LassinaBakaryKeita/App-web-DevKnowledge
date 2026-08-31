import './NotFound.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, FileQuestion, Sparkles, Terminal } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className="notfound-page-root">
      <Header />
      
      <main className="notfound-main">
        <div className="notfound-glow-blob" />

        <div className="container notfound-container">
          <div className="framer-card notfound-card">
            
            {/* 404 Visual badge */}
            <div className="notfound-badge-wrap">
              <span className="notfound-code-badge">404</span>
              <div className="notfound-icon-circle">
                <FileQuestion size={40} color="#a855f7" />
              </div>
            </div>

            <h1 className="notfound-title">Oops! Page Not Found</h1>
            
            <p className="notfound-desc">
              The technical page, route, or documentation you are looking for does not exist or has been moved.
            </p>

            <div className="notfound-actions">
              <Link to="/" className="btn-gradient-v1 notfound-home-btn">
                <Home size={16} />
                <span>Back to Home</span>
              </Link>
              <Link to="/blog" className="btn-gradient-v2">
                <span>Browse Articles</span>
              </Link>
            </div>

            <div className="notfound-terminal-hint">
              <Terminal size={14} />
              <span>HTTP 404 &bull; Route: window.location.pathname</span>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
