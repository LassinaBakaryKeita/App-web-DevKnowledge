import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');

  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  // Synchronise l'onglet actif avec le paramètre d'URL (?mode=register)
  useEffect(() => {
    if (mode === 'register') setActiveTab('register');
  }, [mode]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-app-web-dev-knowledge.vercel.app/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userId', data.user);
        navigate('/blog');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Le serveur ne répond pas. Vérifie que le backend est lancé.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-app-web-dev-knowledge.vercel.app/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userId', data.user);
        navigate('/createArticle');
      } else {
        setError(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setError('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="auth-page">
      <a href="/" className="auth-logo-link">
        <div className="auth-logo-icon">⚡</div>
        <span className="auth-logo-text">Dev<span>Knowledge</span></span>
      </a>

      {error && (
        <div className="auth-error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <div className="auth-tabs">
        <button
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => { setActiveTab('login'); setError(''); }}
        >
          Log in
        </button>
        <button
          className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => { setActiveTab('register'); setError(''); }}
        >
          Sign up
        </button>
      </div>

      {activeTab === 'login' && (
        <div className="auth-card">
          <h1 className="auth-card-title">Welcome back 👋</h1>
          <p className="auth-card-subtitle">
            Don't have an account{' '}
            <a href="#" onClick={() => setActiveTab('register')}>Sign up free</a>
          </p>
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                name="email"
                required
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                name="password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <button className="auth-submit">Login</button>
          </form>
        </div>
      )}

      {activeTab === 'register' && (
        <div className="auth-card">
          <h1 className="auth-card-title">Create your account ✨</h1>
          <p className="auth-card-subtitle">
            Already have an account{' '}
            <a href="#" onClick={() => setActiveTab('login')}>Login here</a>
          </p>
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="auth-field">
              <label className="auth-label">Name</label>
              <input
                className="auth-input"
                type="text"
                name="name"
                required
                value={registerData.name}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                name="email"
                required
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                name="password"
                required
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </div>
            <button className="auth-submit">Register</button>
          </form>
        </div>
      )}

      <p className="auth-footer-note">
        <a href="/">← Back to DevKnowledge</a>
      </p>
    </div>
  );
}

export default Login;