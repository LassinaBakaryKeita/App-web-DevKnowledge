import { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, PenSquare, LogOut, ArrowRight, User, Menu, X, BookOpen } from 'lucide-react';
import { clearStoredUser } from '../config/api';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
  });

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthState({
        token: localStorage.getItem('token'),
        userName: localStorage.getItem('userName'),
      });
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setAuthState({ token: null, userName: null });
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-header--scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-icon">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="navbar-logo-text">Dev<span className="logo-gradient">Knowledge</span></span>
        </Link>

        {/* Center Nav Links */}
        <nav className="navbar-links">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'navbar-link--active' : ''}`} 
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className={`navbar-link ${location.pathname.startsWith('/blog') ? 'navbar-link--active' : ''}`} 
            onClick={closeMenu}
          >
            Articles
          </Link>
          {authState.token && (
            <Link 
              to="/myArticles" 
              className={`navbar-link ${location.pathname === '/myArticles' ? 'navbar-link--active' : ''}`} 
              onClick={closeMenu}
            >
              My Contributions
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          {authState.token ? (
            <div className="navbar-user-actions">
              <div className="navbar-user-badge">
                <User size={14} />
                <span>{authState.userName || 'Author'}</span>
              </div>
              <Link to="/createArticle" className="btn-navbar-write" onClick={closeMenu}>
                <PenSquare size={15} />
                <span>Write</span>
              </Link>
              <button onClick={handleLogout} className="btn-navbar-logout" title="Log out">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="navbar-guest-actions">
              <Link to="/login" className="navbar-link-login" onClick={closeMenu}>
                Log in
              </Link>
              <Link to="/login?mode=register" className="btn-gradient-v1 navbar-btn-cta" onClick={closeMenu}>
                <span>Get Started</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="navbar-hamburger"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="navbar-mobile-drawer">
          {authState.token && (
            <div className="navbar-mobile-user">
              <div className="navbar-mobile-user-avatar">
                <User size={16} />
              </div>
              <div>
                <div className="navbar-mobile-user-name">{authState.userName}</div>
                <div className="navbar-mobile-user-role">Contributor</div>
              </div>
            </div>
          )}

          <Link to="/" className="navbar-mobile-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/blog" className="navbar-mobile-link" onClick={closeMenu}>
            <BookOpen size={16} />
            <span>Articles</span>
          </Link>

          {authState.token ? (
            <>
              <Link to="/myArticles" className="navbar-mobile-link" onClick={closeMenu}>
                My Contributions
              </Link>
              <Link to="/createArticle" className="btn-gradient-v1 navbar-mobile-cta" onClick={closeMenu}>
                <PenSquare size={16} />
                <span>Write an Article</span>
              </Link>
              <button className="navbar-mobile-logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <div className="navbar-mobile-guest-buttons">
              <Link to="/login" className="btn-gradient-v2" onClick={closeMenu}>
                Log in
              </Link>
              <Link to="/login?mode=register" className="btn-gradient-v1" onClick={closeMenu}>
                <span>Join Community</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;