import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MyArticles.css';

const API_BASE = 'https://backend-app-web-dev-knowledge.vercel.app';

function MyArticles() {
  const navigate = useNavigate();
  const [myArticles, setMyArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const fetchMyArticles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/article/mine/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMyArticles(data);
    } catch (error) {
      console.error('Erreur récupération articles :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyArticles();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (article) => {
    navigate('/createArticle', { state: { article } });
  };

  const handleDelete = async (articleId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article? This action cannot be undone.'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/article/delete/${articleId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMyArticles((prev) => prev.filter((a) => a._id !== articleId));
      } else {
        setDeleteError('Failed to delete article. Please try again.');
        setTimeout(() => setDeleteError(''), 3000);
      }
    } catch (error) {
      console.error('Erreur suppression article :', error);
      setDeleteError('Server error. Please try again.');
      setTimeout(() => setDeleteError(''), 3000);
    }
  };

  return (
    <>
      <Header />
      <main className="my-articles-page">
        <div className="my-articles-container">

          <div className="my-articles-back-nav">
            <Link to="/blog" className="my-articles-back-btn">← Back to Blog</Link>
          </div>

          <h1 className="my-articles-title">My Articles</h1>
          <p className="my-articles-subtitle">Manage your publications on DevKnowledge</p>

          {deleteError && <div className="my-articles-error">{deleteError}</div>}

          <div className="my-articles-grid">
            {loading ? (
              <div className="my-articles-loading">
                <p>Loading your articles...</p>
              </div>
            ) : myArticles.length > 0 ? (
              myArticles.map((article) => {
                // URL Cloudinary complète si commence par "http",
                // sinon ancien chemin local préfixé avec le backend
                const imageUrl = article.image
                  ? article.image.startsWith('http')
                    ? article.image
                    : `${API_BASE}/${article.image}`
                  : null;

                return (
                  <div className="my-article-card" key={article._id}>
                    <div className="my-article-image-wrap">
                      {imageUrl ? (
                        <img src={imageUrl} alt={article.title} />
                      ) : (
                        <div className="my-article-image-placeholder">📄</div>
                      )}
                    </div>

                    <div className="my-article-body">
                      <h2 className="my-article-title">{article.title}</h2>
                      <p className="my-article-excerpt">
                        {article.shortDescription?.substring(0, 120)}...
                      </p>
                      <div className="my-article-meta">
                        <span>By <strong>{article.author}</strong></span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="my-article-actions">
                      <button
                        className="my-article-btn my-article-btn--edit"
                        onClick={() => handleEdit(article)}
                      >
                        ✎ Edit
                      </button>
                      <button
                        className="my-article-btn my-article-btn--delete"
                        onClick={() => handleDelete(article._id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="my-articles-empty">
                <span className="my-articles-empty-icon">📝</span>
                <p>You haven't published any articles yet.</p>
                <Link to="/createArticle" className="my-articles-empty-btn">
                  Create my first article →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MyArticles;