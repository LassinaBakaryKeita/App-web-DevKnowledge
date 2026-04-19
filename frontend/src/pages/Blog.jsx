import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Article from '../components/Article';
import './Blog.css';
import { Link } from 'react-router-dom';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('https://backend-app-web-dev-knowledge.vercel.app/api/article/all');
        const data = await res.json();
        if (res.ok) setArticles(data);
      } catch (error) {
        console.error('Erreur de chargement :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Affiche un popup "Coming Soon" pendant 5 secondes à la place de naviguer
  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <>
      <Header />
      <main className="blog-page">
        <div className="blog-container">

          {showPopup && (
            <div className="blog-popup-overlay">
              <div className="blog-popup">
                <div className="blog-popup-icon">🔍</div>
                <h3 className="blog-popup-title">Coming Soon</h3>
                <p className="blog-popup-text">
                  The search feature is currently under development.<br />
                  Stay tuned, it's coming soon!
                </p>
                <div className="blog-popup-bar">
                  <div className="blog-popup-bar-fill" />
                </div>
                <button className="blog-popup-close" onClick={() => setShowPopup(false)}>
                  ✕ Close
                </button>
              </div>
            </div>
          )}

          <div className="blog-header">
            <div className="blog-actions">
              <button className="blog-btn blog-btn-secondary" onClick={handleSearchClick}>
                🔍 Search
              </button>
              <Link to="/myArticles" className="blog-btn blog-btn-secondary">📄 My Articles</Link>
              <Link to="/createArticle" className="blog-btn blog-btn-primary">➕ Add Article</Link>
            </div>
            <div className="blog-header-text">
              <h1>All Articles</h1>
              <p>Discover in-depth technical content from the community</p>
            </div>
          </div>

          <div className="blog-grid">
            {loading ? (
              <p>Chargement des articles...</p>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Article key={article._id} article={article} />
              ))
            ) : (
              <p>Aucun article pour le moment. Soyez le premier à publier !</p>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default Blog;