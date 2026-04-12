import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">⚡</div>
          <span className="navbar-logo-text">Dev<span>Knowledge</span></span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link active">Home</Link>
          <Link to="/blog" className="navbar-link">Blog</Link>
          {token && <Link to="/myArticles" className="navbar-link">My Articles</Link>}
        </div>

        <div className="navbar-actions">
          {token ? (
            <>
              <span className="navbar-user-name">Welcome, <strong>{userName}</strong></span>
              <Link to="/createArticle" className="navbar-btn-cta">Write an Article ✍️</Link>
              <button
                onClick={handleLogout}
                className="navbar-btn-login"
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-login">Log in</Link>
              <Link to="/login" className="navbar-btn-cta">Get Started →</Link>
            </>
          )}
        </div>

        <div className="navbar-hamburger" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;