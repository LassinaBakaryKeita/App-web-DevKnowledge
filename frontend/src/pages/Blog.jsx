import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Article from '../components/Article';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Search, BookOpen, PlusCircle, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import { API_BASE } from '../config/api';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'Architecture', 'TypeScript', 'Backend', 'React', 'DevOps', 'Distributed Systems'];

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/article/all`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}: Failed to retrieve articles`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setArticles(data);
      } else {
        throw new Error('Received unexpected data format from articles API');
      }
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err.message || 'Unable to connect to DevKnowledge servers. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    let result = articles;
    if (activeTag !== 'All') {
      result = result.filter(
        (a) => (a.tag || 'Architecture').toLowerCase() === activeTag.toLowerCase()
      );
    }
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          (a.title || '').toLowerCase().includes(q) ||
          (a.shortDescription || '').toLowerCase().includes(q) ||
          (a.author || '').toLowerCase().includes(q)
      );
    }
    setFilteredArticles(result);
  }, [searchTerm, activeTag, articles]);

  return (
    <div className="blog-page-root">
      <Header />
      
      <main className="blog-main">
        <div className="ambient-glow-center" style={{ top: '15%' }} />

        <div className="container blog-container">
          
          {/* Hero Header */}
          <div className="blog-hero-header">
            <div className="section-badge">
              <span className="section-badge-dot" />
              <span>Community Knowledge Base</span>
            </div>
            <h1 className="blog-page-title">Technical Articles & Breakdowns</h1>
            <p className="blog-page-sub">
              Explore battle-tested techniques, architecture blueprints, and hands-on lessons written by working software engineers.
            </p>

            {/* Actions Bar */}
            <div className="blog-controls-bar">
              {/* Search input */}
              <div className="blog-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles by title, topic, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="blog-search-input"
                />
              </div>

              {/* Action buttons */}
              <div className="blog-action-buttons">
                <Link to="/myArticles" className="btn-gradient-v2 blog-action-btn">
                  <BookOpen size={15} />
                  <span>My Articles</span>
                </Link>
                <Link to="/createArticle" className="btn-gradient-v1 blog-action-btn">
                  <PlusCircle size={15} />
                  <span>Publish Article</span>
                </Link>
              </div>
            </div>

            {/* Tag Filter Pills */}
            <div className="blog-tags-row">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`blog-tag-pill ${activeTag === tag ? 'blog-tag-pill--active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Section with 4 distinct states: Loading, Error, Empty, and Success */}
          <div className="blog-grid-section">
            {loading ? (
              <div className="blog-loading-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="framer-card blog-skeleton-card" />
                ))}
              </div>
            ) : error ? (
              <div className="framer-card blog-error-state">
                <AlertCircle size={42} color="#ef4444" />
                <h3>Failed to load articles</h3>
                <p>{error}</p>
                <button className="btn-gradient-v1" onClick={fetchArticles}>
                  <RefreshCw size={15} />
                  <span>Retry Connection</span>
                </button>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="blog-articles-grid">
                {filteredArticles.map((article) => (
                  <Article key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="framer-card blog-no-results">
                <Layers size={40} color="#a855f7" />
                <h3>No articles found</h3>
                <p>
                  {articles.length === 0
                    ? 'There are no published articles in the platform yet. Be the first to share knowledge!'
                    : 'No articles match your current search query or topic filter.'}
                </p>
                {articles.length === 0 ? (
                  <Link to="/createArticle" className="btn-gradient-v1">
                    <PlusCircle size={15} />
                    <span>Publish First Article</span>
                  </Link>
                ) : (
                  <button
                    className="btn-gradient-v2"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveTag('All');
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;