import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Article from '../components/Article';
import './Blog.css';
import { Link } from 'react-router-dom';
import { Search, BookOpen, PlusCircle, Filter, Sparkles, Code2, Layers } from 'lucide-react';
import { API_BASE } from '../config/api';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'Architecture', 'TypeScript', 'Backend', 'React', 'DevOps', 'Distributed Systems'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/article/all`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setArticles(data);
          setFilteredArticles(data);
        }
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    let result = articles;
    if (activeTag !== 'All') {
      result = result.filter(
        (a) => (a.tag || '').toLowerCase() === activeTag.toLowerCase()
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

          {/* Grid */}
          <div className="blog-grid-section">
            {loading ? (
              <div className="blog-loading-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="framer-card blog-skeleton-card" />
                ))}
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
                <p>Try adjusting your search criteria or filter tags.</p>
                <button
                  className="btn-gradient-v2"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveTag('All');
                  }}
                >
                  Reset Filters
                </button>
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