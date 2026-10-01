import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Article.css';
import { Heart, MessageSquare, ArrowRight, FileCode2, Clock, Calendar } from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';
import ShareArticle from './ShareArticle';

function Article({ article }) {
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const {
    _id,
    title = 'Untitled Article',
    shortDescription = '',
    author = 'Anonymous',
    createdAt = '',
    tag = 'Architecture',
    image = '',
    likes = 0,
    comments = 0,
    readTime = '5 min read',
  } = article || {};

  const [likesCount, setLikesCount] = useState(likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(comments || 0);

  const authorInitial = author ? author.charAt(0).toUpperCase() : 'A';

  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${API_BASE}/${image}`
    : null;

  useEffect(() => {
    const checkLikeStatus = async () => {
      const { userId, token } = getStoredUser();
      if (!userId || !token || !_id) return;
      try {
        const res = await fetch(
          `${API_BASE}/api/like/check?userId=${userId}&articleId=${_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setIsLiked(data.isLiked);
        }
      } catch (err) {
        console.error('Like check error:', err);
      }
    };
    checkLikeStatus();
  }, [_id]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      if (!_id) return;
      try {
        const res = await fetch(`${API_BASE}/api/comment/count/${_id}`);
        if (res.ok) {
          const data = await res.json();
          setCommentsCount(data.count);
        }
      } catch (err) {
        console.error('Comments count fetch error:', err);
      }
    };
    fetchCommentsCount();
  }, [_id]);

  const handleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { token, userId } = getStoredUser();
    if (!token || !userId) {
      navigate('/login');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/like/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, articleId: _id }),
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

  const handleCommentClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { token, userId, userName } = getStoredUser();
    if (!token || !userId) {
      navigate('/login');
      return;
    }
    navigate('/CommentArticle', {
      state: {
        articleId: _id,
        articleTitle: title,
        article,
        userName: userName || 'Developer',
      },
    });
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  return (
    <article className={`framer-card article-card ${isShareOpen ? 'has-share-open' : ''}`}>
      
      {/* Image / Header Wrap */}
      <div className="article-card-media">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="article-card-img" />
        ) : (
          <div className="article-card-code-placeholder">
            <div className="placeholder-code-lines">
              <span className="code-ph-line" />
              <span className="code-ph-line short" />
              <span className="code-ph-line medium" />
            </div>
            <FileCode2 size={32} color="#8b5cf6" />
          </div>
        )}
        <span className="article-card-tag-pill">{tag}</span>
      </div>

      {/* Body */}
      <div className="article-card-content">
        
        {/* Author info */}
        <div className="article-card-meta">
          <div className="article-author-avatar">{authorInitial}</div>
          <div className="article-author-details">
            <span className="article-author-name">{author}</span>
            <div className="article-date-row">
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="article-card-title">
          <Link to={`/article/${_id}`} state={{ article }}>
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {shortDescription && (
          <p className="article-card-desc">
            {shortDescription.length > 130
              ? `${shortDescription.substring(0, 130)}...`
              : shortDescription}
          </p>
        )}

        {/* Footer actions */}
        <div className="article-card-foot">
          <div className="article-card-actions">
            <button
              className={`article-action-btn ${isLiked ? 'article-action-btn--liked' : ''}`}
              onClick={handleLike}
              title={isLiked ? 'Liked' : 'Like'}
            >
              <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likesCount}</span>
            </button>

            <button
              className="article-action-btn"
              onClick={handleCommentClick}
              title="Comments"
            >
              <MessageSquare size={15} />
              <span>{commentsCount}</span>
            </button>

            <ShareArticle
              article={article}
              variant="card"
              onOpenChange={setIsShareOpen}
            />
          </div>

          <Link to={`/article/${_id}`} state={{ article }} className="article-read-link">
            <span>Read</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </article>
  );
}

export default Article;