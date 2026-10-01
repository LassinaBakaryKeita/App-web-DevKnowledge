import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './detailedInformationArticle.css';
import { ArrowLeft, User, Calendar, Tag, Heart, MessageSquare, Share2, Sparkles, FileText } from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';
import ShareArticle from '../components/ShareArticle';

function DetailedInformationArticle() {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [likesCount, setLikesCount] = useState(article?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!article && id) {
      // Fallback fetching article if entered directly by URL
      fetch(`${API_BASE}/api/article/all`)
        .then((res) => res.json())
        .then((articles) => {
          if (Array.isArray(articles)) {
            const found = articles.find((a) => a._id === id);
            if (found) {
              setArticle(found);
              setLikesCount(found.likes || 0);
            }
          }
        })
        .catch((err) => console.error('Error loading article:', err))
        .finally(() => setLoading(false));
    }
  }, [id, article]);

  const imageUrl = article?.image
    ? article.image.startsWith('http')
      ? article.image
      : `${API_BASE}/${article.image}`
    : '';

  const handleLike = async () => {
    const { token, userId } = getStoredUser();
    if (!token || !userId || !article) return;
    try {
      const res = await fetch(`${API_BASE}/api/like/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, articleId: article._id }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikesCount(data.likes);
        setIsLiked(data.message === 'like');
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  if (loading) {
    return (
      <div className="detail-page-root">
        <Header />
        <div className="container detail-loading-wrap">
          <div className="framer-card detail-skeleton-box" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="detail-page-root">
        <Header />
        <div className="container detail-not-found framer-card">
          <h2>Article Not Found</h2>
          <p>The requested article could not be retrieved or has been removed.</p>
          <Link to="/blog" className="btn-gradient-v1">
            <ArrowLeft size={16} />
            <span>Return to Articles</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-page-root">
      <Header />
      
      <main className="detail-main">
        <div className="ambient-glow-center" style={{ top: '15%' }} />

        <div className="container detail-container">
          
          {/* Back link */}
          <Link to="/blog" className="detail-back-button">
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>

          {/* Article Banner & Header */}
          <div className="detail-article-header">
            <div className="detail-tags-row">
              <span className="section-badge">
                <span className="section-badge-dot" />
                <span>{article.tag || 'Software Engineering'}</span>
              </span>
            </div>

            <h1 className="detail-title">{article.title}</h1>
            
            {article.shortDescription && (
              <p className="detail-lead">{article.shortDescription}</p>
            )}

            {/* Author Meta Strip */}
            <div className="detail-author-strip framer-card">
              <div className="detail-author-left">
                <div className="detail-author-avatar">
                  {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <div className="detail-author-name">{article.author || 'Anonymous'}</div>
                  <div className="detail-author-meta-date">
                    <Calendar size={13} />
                    <span>
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Published recently'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-header-actions">
                <button
                  className={`btn-gradient-v2 detail-like-btn ${isLiked ? 'detail-like-btn--active' : ''}`}
                  onClick={handleLike}
                >
                  <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{likesCount} Likes</span>
                </button>

                <Link
                  to="/CommentArticle"
                  state={{
                    articleId: article._id,
                    articleTitle: article.title,
                    article,
                    userName: localStorage.getItem('userName') || 'Developer',
                  }}
                  className="btn-gradient-v1 detail-comment-btn"
                >
                  <MessageSquare size={15} />
                  <span>Comments</span>
                </Link>

                <ShareArticle
                  article={article}
                  variant="detail"
                />
              </div>
            </div>

            {/* Image Preview if available */}
            {imageUrl && (
              <div className="detail-media-wrap framer-card">
                <img src={imageUrl} alt={article.title} className="detail-hero-image" />
              </div>
            )}

          </div>

          {/* Main Content Body */}
          <div className="framer-card detail-body-card">
            <div className="detail-prose">
              {article.fullDescription ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.fullDescription}
                </ReactMarkdown>
              ) : (
                <p>No full content provided for this article.</p>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DetailedInformationArticle;