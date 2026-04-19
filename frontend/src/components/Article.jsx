import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Article.css';

const API_BASE = 'https://backend-app-web-dev-knowledge.vercel.app';

function Article({ article }) {
  const navigate = useNavigate();
  const {
    _id,
    title = 'Untitled Article',
    shortDescription = '',
    author = 'Anonymous',
    createdAt = '',
    tag = 'General',
    image = '',
    likes = 0,
    comments = 0,
    readTime = '5 min read',
  } = article || {};

  const [likesCount, setLikesCount] = useState(likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(comments || 0);

  const authorInitial = author ? author.charAt(0).toUpperCase() : '?';

  // Si l'URL de l'image commence par "http" c'est une URL Cloudinary complète
  // Sinon c'est un ancien chemin local qu'on préfixe avec l'URL du backend
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${API_BASE}/${image}`
    : null;

  useEffect(() => {
    const checkLikeStatus = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId || !token) return;
      try {
        const res = await fetch(
          `${API_BASE}/api/like/check?userId=${userId}&articleId=${_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setIsLiked(data.isLiked);
      } catch (err) {
        console.error('Erreur vérification like :', err);
      }
    };
    checkLikeStatus();
  }, [_id]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comment/count/${_id}`);
        if (res.ok) {
          const data = await res.json();
          setCommentsCount(data.count);
        }
      } catch (err) {
        console.error('Erreur récupération nombre de commentaires :', err);
      }
    };
    fetchCommentsCount();
  }, [_id]);

  const handleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      alert("Veuillez vous connecter d'abord !");
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
      console.error('Erreur toggle like :', err);
    }
  };

  const handleCommentClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      alert("Veuillez vous connecter d'abord !");
      navigate('/login');
      return;
    }
    navigate('/CommentArticle', {
      state: {
        articleId: _id,
        articleTitle: title,
        article,
        userName: localStorage.getItem('userName'),
      },
    });
  };

  return (
    <div className="article-card">
      <div className="article-card-image-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="article-card-image-placeholder">📄</div>
        )}
        <span className="article-card-tag">{tag}</span>
      </div>

      <div className="article-card-body">
        <div className="article-card-author">
          <div className="article-card-avatar">{authorInitial}</div>
          <div className="article-card-author-info">
            <div className="article-card-author-name">{author}</div>
            <div className="article-card-date">
              {createdAt ? new Date(createdAt).toLocaleDateString() : readTime}
            </div>
          </div>
        </div>

        <div className="article-card-title">{title}</div>
        {shortDescription && (
          <div className="article-card-excerpt">
            {shortDescription.substring(0, 150)}...
          </div>
        )}

        <div className="article-card-footer">
          <div className="article-card-stats">
            <span className="article-card-stat" onClick={handleLike} style={{ cursor: 'pointer' }}>
              {isLiked ? '❤️' : '🤍'} {likesCount}
            </span>
            <button
              className="article-card-stat"
              onClick={handleCommentClick}
              style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit' }}
            >
              💬 {commentsCount}
            </button>
          </div>
          <Link to={`/article/${_id}`} state={{ article }} className="article-card-read-btn">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Article;