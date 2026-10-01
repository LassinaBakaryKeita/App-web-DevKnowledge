import { useState, useRef, useEffect } from 'react';
import './ShareArticle.css';
import { Share2, Copy, Check } from 'lucide-react';
import { FaWhatsapp, FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6';

function ShareArticle({ article, variant = 'card', onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const menuRef = useRef(null);

  const { _id, title = 'Technical Article' } = article || {};

  const getArticleUrl = () => {
    if (typeof window === 'undefined') return '';
    const base = window.location.origin;
    return `${base}/article/${_id || ''}`;
  };

  const copyToClipboard = async (textToCopy) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } else {
        // Fallback for older browsers / non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onOpenChange) {
      onOpenChange(nextState);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleShareWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getArticleUrl();
    const text = `Read "${title}" on DevKnowledge:\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getArticleUrl();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareTikTok = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getArticleUrl();
    const shareText = `${title} — ${url}`;
    await copyToClipboard(shareText);
    setCopied(true);
    setFeedback('Link copied for TikTok! Opening TikTok...');
    setTimeout(() => {
      window.open('https://www.tiktok.com', '_blank', 'noopener,noreferrer');
    }, 400);
    setTimeout(() => {
      setCopied(false);
      setFeedback('');
    }, 2500);
  };

  const handleShareTwitter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getArticleUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getArticleUrl();
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setFeedback('Link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setFeedback('');
      }, 2500);
    }
  };

  return (
    <div className={`share-container share-container--${variant}`} ref={menuRef}>
      <button
        type="button"
        className={
          variant === 'detail'
            ? `btn-gradient-v2 detail-share-btn ${isOpen ? 'detail-share-btn--active' : ''}`
            : `article-action-btn article-share-trigger ${isOpen ? 'article-action-btn--active' : ''}`
        }
        onClick={handleToggle}
        title="Share article"
        aria-label="Share article"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Share2 size={15} />
        <span>Share</span>
      </button>

      {isOpen && (
        <div
          className={`share-popover share-popover--${variant}`}
          role="menu"
          aria-label="Share options"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="share-popover-header">
            <span className="share-popover-title">Share Article</span>
          </div>

          <div className="share-platform-list">
            {/* WhatsApp */}
            <button
              type="button"
              className="share-platform-item"
              onClick={handleShareWhatsApp}
              role="menuitem"
            >
              <span className="share-icon-wrap share-icon-wrap--whatsapp">
                <FaWhatsapp size={15} />
              </span>
              <span className="share-platform-name">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              type="button"
              className="share-platform-item"
              onClick={handleShareLinkedIn}
              role="menuitem"
            >
              <span className="share-icon-wrap share-icon-wrap--linkedin">
                <FaLinkedinIn size={14} />
              </span>
              <span className="share-platform-name">LinkedIn</span>
            </button>

            {/* TikTok */}
            <button
              type="button"
              className="share-platform-item"
              onClick={handleShareTikTok}
              role="menuitem"
            >
              <span className="share-icon-wrap share-icon-wrap--tiktok">
                <FaTiktok size={13} />
              </span>
              <span className="share-platform-name">TikTok</span>
            </button>

            {/* X / Twitter */}
            <button
              type="button"
              className="share-platform-item"
              onClick={handleShareTwitter}
              role="menuitem"
            >
              <span className="share-icon-wrap share-icon-wrap--twitter">
                <FaXTwitter size={13} />
              </span>
              <span className="share-platform-name">X (Twitter)</span>
            </button>

            <div className="share-popover-divider" />

            {/* Copy Link */}
            <button
              type="button"
              className={`share-platform-item ${copied ? 'share-platform-item--copied' : ''}`}
              onClick={handleCopyLink}
              role="menuitem"
            >
              <span className={`share-icon-wrap share-icon-wrap--copy ${copied ? 'is-copied' : ''}`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </span>
              <span className="share-platform-name">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          {feedback && (
            <div className="share-feedback-toast" role="status" aria-live="polite">
              <Check size={12} />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShareArticle;
