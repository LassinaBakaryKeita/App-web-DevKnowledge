import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MyArticles.css';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, ArrowRight, Eye, Heart, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';

function MyArticles() {
  const navigate = useNavigate();
  const { token, userId, userName } = getStoredUser();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchMyArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/article/mine/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Error fetching my articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [token, userId, navigate]);

  const handleDelete = async (articleId) => {
    if (!window.confirm('Are you sure you want to permanently delete this article?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/article/delete/${articleId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setArticles(articles.filter((a) => a._id !== articleId));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="my-articles-page-root">
      <Header />
      
      <main className="my-articles-main">
        <div className="ambient-glow-center" style={{ top: '15%' }} />

        <div className="container my-articles-container">
          
          {/* Header */}
          <div className="my-articles-top-header">
            <div>
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>Author Dashboard</span>
              </div>
              <h1 className="my-articles-title">My Published Articles</h1>
              <p className="my-articles-sub">
                Manage, edit, and track community engagement on your contributions.
              </p>
            </div>

            <Link to="/createArticle" className="btn-gradient-v1 my-articles-add-btn">
              <PlusCircle size={16} />
              <span>New Article</span>
            </Link>
          </div>

          {/* List */}
          {loading ? (
            <div className="my-articles-loading">
              {[1, 2, 3].map((n) => (
                <div key={n} className="framer-card my-articles-skeleton" />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="my-articles-list">
              {articles.map((article) => (
                <div key={article._id} className="framer-card my-article-row">
                  <div className="my-article-info">
                    <span className="my-article-tag">{article.tag || 'General'}</span>
                    <h3 className="my-article-name">{article.title}</h3>
                    <p className="my-article-excerpt">{article.shortDescription}</p>
                    <div className="my-article-stats">
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      <span className="dot" />
                      <span>{article.likes || 0} Likes</span>
                    </div>
                  </div>

                  <div className="my-article-row-actions">
                    <Link
                      to={`/article/${article._id}`}
                      state={{ article }}
                      className="btn-gradient-v2 my-row-btn"
                      title="View public page"
                    >
                      <Eye size={15} />
                      <span>View</span>
                    </Link>

                    <button
                      onClick={() => navigate('/createArticle', { state: { article } })}
                      className="btn-gradient-v2 my-row-btn"
                      title="Edit article"
                    >
                      <Edit size={15} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(article._id)}
                      className="my-row-btn-delete"
                      title="Delete article"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="framer-card my-articles-empty">
              <BookOpen size={44} color="#a855f7" />
              <h3>No publications yet</h3>
              <p>You have not published any articles yet. Share your technical expertise with the community!</p>
              <Link to="/createArticle" className="btn-gradient-v1">
                <PlusCircle size={16} />
                <span>Publish First Article</span>
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyArticles;