import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { Zap, ArrowLeft, UserCheck, UserPlus, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE, setStoredUser } from '../config/api';

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');

  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (mode === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
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
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        setStoredUser({
          token: data.token,
          userName: data.userName,
          user: data.user,
        });
        navigate('/blog');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login network error:', err);
      setError('Unable to reach the server. Please verify backend status and internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (res.ok) {
        setStoredUser({
          token: data.token,
          userName: data.userName,
          user: data.user,
        });
        navigate('/createArticle');
      } else {
        setError(data.error || 'Registration failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Registration network error:', err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-glow-blob" />
      
      <div className="auth-container">
        
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <Zap size={20} strokeWidth={2.5} />
          </div>
          <span className="auth-logo-text">Dev<span className="logo-gradient">Knowledge</span></span>
        </Link>

        {/* Auth Card Container */}
        <div className="framer-card auth-card">
          
          {/* Switcher Tabs */}
          <div className="auth-nav-tabs">
            <button
              className={`auth-tab-btn ${activeTab === 'login' ? 'auth-tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); }}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`auth-tab-btn ${activeTab === 'register' ? 'auth-tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('register'); setError(''); }}
              type="button"
            >
              Create Account
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="auth-error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="auth-header-copy">
                <h2>Welcome Back</h2>
                <p>Enter your developer credentials to access your account</p>
              </div>

              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="auth-input-field">
                  <Mail size={16} className="auth-field-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alex@company.dev"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <div className="auth-input-field">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gradient-v1 auth-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="auth-spinner" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <UserCheck size={16} />
                    <span>Sign In to DevKnowledge</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
              <div className="auth-header-copy">
                <h2>Join DevKnowledge</h2>
                <p>Create an author account to publish articles and engage</p>
              </div>

              <div className="auth-input-group">
                <label>Full Name / Handle</label>
                <div className="auth-input-field">
                  <User size={16} className="auth-field-icon" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Alex Rivera"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="auth-input-field">
                  <Mail size={16} className="auth-field-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alex@company.dev"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Password (8+ chars)</label>
                <div className="auth-input-field">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gradient-v1 auth-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="auth-spinner" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    <span>Create Developer Account</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Back link */}
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={14} />
          <span>Back to DevKnowledge Home</span>
        </Link>

      </div>
    </div>
  );
}

export default Login;