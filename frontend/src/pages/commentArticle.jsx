import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './commentArticle.css';
import { ArrowLeft, MessageSquare, Send, User, Trash2, Heart, Sparkles, Loader2 } from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';

function CommentArticle() {
  const location = useLocation();
  const navigate = useNavigate();

  const { articleId, articleTitle } = location.state || {};
  const { token, userId, userName } = getStoredUser();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!articleId) {
      navigate('/blog');
      return;
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comment/get/${articleId}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setComments(data);
        } else if (data && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!token || !userId) {
      alert('Please log in to post a comment.');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/comment/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId,
          userId,
          commentContain: newComment,
          content: newComment,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        const newObj = {
          _id: saved.comment || Date.now().toString(),
          userId,
          userName: userName || 'Developer',
          content: newComment,
          createdAt: new Date().toISOString(),
        };
        setComments([newObj, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/comment/delete/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="comments-page-root">
      <Header />
      
      <main className="comments-main">
        <div className="ambient-glow-center" style={{ top: '15%' }} />

        <div className="container comments-container">
          
          <Link to={`/article/${articleId}`} className="comments-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Article</span>
          </Link>

          {/* Header Card */}
          <div className="framer-card comments-header-card">
            <div className="section-badge">
              <span className="section-badge-dot" />
              <span>Peer Discussions</span>
            </div>
            <h1 className="comments-headline">Discussion & Code Feedback</h1>
            <p className="comments-article-ref">
              On article: <strong>{articleTitle || 'Technical Article'}</strong>
            </p>
          </div>

          {/* New Comment Input */}
          <div className="framer-card comments-input-card">
            <form onSubmit={handleSubmit}>
              <div className="comments-author-tag">
                <User size={14} />
                <span>Commenting as <strong>{userName || 'Guest (Please log in)'}</strong></span>
              </div>
              
              <textarea
                className="comments-textarea"
                rows={4}
                required
                placeholder="Share your thoughts, suggestions, code alternatives, or questions with the author..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              <div className="comments-form-foot">
                <button
                  type="submit"
                  className="btn-gradient-v1 comments-submit-btn"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="auth-spinner" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="comments-list-wrap">
            <div className="comments-count-title">
              <MessageSquare size={18} color="#c084fc" />
              <span>Community Feedback ({comments.length})</span>
            </div>

            {loading ? (
              <div className="comments-loading">
                {[1, 2].map((n) => (
                  <div key={n} className="framer-card comments-skeleton" />
                ))}
              </div>
            ) : comments.length > 0 ? (
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment._id} className="framer-card comment-card">
                    <div className="comment-card-top">
                      <div className="comment-user-box">
                        <div className="comment-avatar">
                          {comment.userName ? comment.userName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="comment-user-name">{comment.userName || 'Engineer'}</div>
                          <div className="comment-date">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Recent'}
                          </div>
                        </div>
                      </div>

                      {comment.userId === userId && (
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="comment-delete-btn"
                          title="Delete your comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="comment-content-text">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="framer-card comments-empty">
                <MessageSquare size={36} color="#a855f7" />
                <h3>No comments yet</h3>
                <p>Be the first to share feedback or ask a technical question on this article.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CommentArticle;