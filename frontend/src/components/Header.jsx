import { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-icon">⚡</div>
          <span className="navbar-logo-text">Dev<span>Knowledge</span></span>
        </Link>

        {/* Liens desktop */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
          <Link to="/blog" className="navbar-link" onClick={closeMenu}>Blog</Link>
          {token && (
            <Link to="/myArticles" className="navbar-link" onClick={closeMenu}>
              My Articles
            </Link>
          )}
        </div>

        {/* Actions desktop */}
        <div className="navbar-actions">
          {token ? (
            <>
              <span className="navbar-user-name">
                Welcome, <strong>{userName}</strong>
              </span>
              <Link to="/createArticle" className="navbar-btn-cta" onClick={closeMenu}>
                Write an Article ✍️
              </Link>
              <button onClick={handleLogout} className="navbar-btn-login">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-login" onClick={closeMenu}>Log in</Link>
              <Link to="/login" className="navbar-btn-cta" onClick={closeMenu}>Get Started →</Link>
            </>
          )}
        </div>

        {/* Bouton hamburger — mobile uniquement */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'navbar-hamburger--open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Menu déroulant mobile */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'navbar-mobile-menu--open' : ''}`}>

        {/* Nom de l'utilisateur si connecté */}
        {token && (
          <div className="navbar-mobile-user">
            👋 Welcome, <strong>{userName}</strong>
          </div>
        )}

        <Link to="/" className="navbar-mobile-link" onClick={closeMenu}>Home</Link>
        <Link to="/blog" className="navbar-mobile-link" onClick={closeMenu}>Blog</Link>

        {token && (
          <>
            <Link to="/myArticles" className="navbar-mobile-link" onClick={closeMenu}>
              My Articles
            </Link>
            <Link to="/createArticle" className="navbar-mobile-link navbar-mobile-link--cta" onClick={closeMenu}>
              ✍️ Write an Article
            </Link>
            <button className="navbar-mobile-link navbar-mobile-link--logout" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login" className="navbar-mobile-link" onClick={closeMenu}>Log in</Link>
            <Link to="/login" className="navbar-mobile-link navbar-mobile-link--cta" onClick={closeMenu}>
              Get Started →
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;