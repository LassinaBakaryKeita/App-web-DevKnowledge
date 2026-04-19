import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./commentArticle.css";

const API_BASE = "https://backend-app-web-dev-knowledge.vercel.app/api";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitial(name) {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
}

function getAvatarColor(name) {
  const colors = [
    "#4f7df9", "#e05c7a", "#34b89a", "#f5a623",
    "#9b59b6", "#1abc9c", "#e74c3c", "#3498db",
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export default function CommentArticle() {
  const navigate = useNavigate();
  const location = useLocation();

  const article = location.state?.article || null;
  const articleId = location.state?.articleId || article?._id || "";
  const articleTitle = location.state?.articleTitle || article?.title || "Article";

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // NOUVEAU : ID du commentaire en cours de modification (null = mode "ajout")
  const [editingCommentId, setEditingCommentId] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const userName = location.state?.userName || localStorage.getItem("userName") || "Anonymous";

  const fetchComments = async () => {
    if (!articleId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/comment/get/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(Array.isArray(data) ? data : data.comments || []);
    } catch (err) {
      setError("Could not load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [articleId]);

  // ── SOUMETTRE (ajout OU modification selon editingCommentId) ──
  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    if (!articleId) {
      setSubmitError("Article ID is missing. Please go back and try again.");
      return;
    }
    if (!userId) {
      setSubmitError("You must be logged in to post a comment.");
      return;
    }

    setSubmitError("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      if (editingCommentId) {
        // ── MODE MODIFICATION : PUT /api/comment/update/:id ──
        const res = await fetch(`${API_BASE}/comment/update/${editingCommentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ commentContain: commentText.trim() }),
        });
        if (!res.ok) throw new Error("Failed to update comment");
        setSuccessMsg("Comment updated successfully!");
        setEditingCommentId(null); // Repasse en mode "ajout"
      } else {
        // ── MODE AJOUT : POST /api/comment/add ──
        const res = await fetch(`${API_BASE}/comment/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, articleId, commentContain: commentText.trim() }),
        });
        if (!res.ok) throw new Error("Failed to post comment");
        setSuccessMsg("Comment posted successfully!");
      }

      setCommentText("");
      await fetchComments();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setSubmitError(
        editingCommentId
          ? "Failed to update comment. Please try again."
          : "Failed to post comment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── CLIC SUR "MODIFIER" : charge le texte dans le textarea ──
  const handleEditClick = (comment) => {
    const text = comment.commentContain || comment.content || comment.text || "";
    setCommentText(text);           // Charge le texte existant dans le textarea
    setEditingCommentId(comment._id); // Passe en mode "modification"
    setSubmitError("");
    setSuccessMsg("");
    // Scroll vers le formulaire pour que l'utilisateur le voit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── CLIC SUR "ANNULER" : annule la modification en cours ──
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setCommentText("");
    setSubmitError("");
  };

  // ── CLIC SUR "SUPPRIMER" : confirmation puis fetch DELETE ──
  const handleDeleteClick = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone."
    );
    
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/comment/delete/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete comment");
      setSuccessMsg("Comment deleted successfully!");
      await fetchComments();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setSubmitError("Failed to delete comment. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleSubmit();
  };

  // ── VÉRIFIE si le commentaire appartient à l'utilisateur connecté ──
  // On compare l'ID stocké dans le commentaire avec celui du localStorage
  const isOwner = (comment) => {
    const commentOwnerId =
      comment.userId?._id?.toString() ||   // après populate → objet { _id, name }
      comment.userId?.toString() ||         // avant populate → string directe
      "";
    return commentOwnerId === userId;
  };

  return (
    <div className="ca-root">
      <div className="ca-bg-blob ca-bg-blob--1" />
      <div className="ca-bg-blob ca-bg-blob--2" />

      <div className="ca-container">
        {/* Header */}
        <header className="ca-header">
          <button className="ca-back-btn" onClick={() => navigate(-1)}>
            <span className="ca-back-icon">←</span>
            <span>Back</span>
          </button>
          <div className="ca-header-content">
            <div className="ca-header-label">Discussion</div>
            <h1 className="ca-article-title">{articleTitle}</h1>
            <div className="ca-comment-count">
              {!loading && (
                <span>
                  {comments.length} {comments.length === 1 ? "comment" : "comments"}
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="ca-layout">
          {/* ── FORMULAIRE (Ajout OU Modification) ── */}
          <section className="ca-compose-section">
            <div className={`ca-compose-card ${editingCommentId ? "ca-compose-card--editing" : ""}`}>
              <div className="ca-compose-header">
                <div
                  className="ca-compose-avatar"
                  style={{ background: getAvatarColor(userName) }}
                >
                  {getInitial(userName)}
                </div>
                <span className="ca-compose-label">
                  <strong>{userName}</strong> —{" "}
                  {editingCommentId ? "Edit your comment" : "Leave a comment"}
                </span>
              </div>

              <textarea
                className="ca-textarea"
                placeholder="Share your thoughts… (Ctrl+Enter to submit)"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={4}
                disabled={submitting}
              />

              <div className="ca-compose-footer">
                {submitError && (
                  <span className="ca-msg ca-msg--error">{submitError}</span>
                )}
                {successMsg && (
                  <span className="ca-msg ca-msg--success">{successMsg}</span>
                )}
                <div className="ca-compose-actions">
                  <span className="ca-char-hint">
                    {commentText.length > 0 ? `${commentText.length} chars` : ""}
                  </span>

                  {/* Bouton Annuler — visible uniquement en mode modification */}
                  {editingCommentId && (
                    <button className="ca-cancel-btn" onClick={handleCancelEdit}>
                      ✕ Cancel
                    </button>
                  )}

                  {/* Bouton principal : "Post Comment" OU "Update Comment" */}
                  <button
                    className={`ca-submit-btn ${submitting ? "ca-submit-btn--loading" : ""} ${editingCommentId ? "ca-submit-btn--update" : ""}`}
                    onClick={handleSubmit}
                    disabled={submitting || !commentText.trim()}
                  >
                    {submitting ? (
                      <>
                        <span className="ca-spinner" />
                        {editingCommentId ? "Updating…" : "Posting…"}
                      </>
                    ) : editingCommentId ? (
                      <>
                        <span className="ca-btn-icon">✎</span>
                        Update Comment
                      </>
                    ) : (
                      <>
                        <span className="ca-btn-icon">✦</span>
                        Post Comment
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── LISTE DES COMMENTAIRES ── */}
          <section className="ca-comments-section">
            {loading ? (
              <div className="ca-loading">
                <div className="ca-loading-dots">
                  <span /><span /><span />
                </div>
                <p>Loading comments…</p>
              </div>
            ) : error ? (
              <div className="ca-empty-state ca-empty-state--error">
                <div className="ca-empty-icon">⚠</div>
                <p>{error}</p>
                <button className="ca-retry-btn" onClick={fetchComments}>Retry</button>
              </div>
            ) : comments.length === 0 ? (
              <div className="ca-empty-state">
                <div className="ca-empty-icon">💬</div>
                <p className="ca-empty-title">No comments yet</p>
                <p className="ca-empty-sub">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <ul className="ca-comment-list">
                {comments.map((comment, idx) => {
                  const name =
                    comment.userId?.name ||
                    comment.user?.name ||
                    comment.userId?.username ||
                    comment.username ||
                    "Anonymous";
                  const text =
                    comment.commentContain ||
                    comment.content ||
                    comment.text ||
                    "";
                  const date =
                    comment.createdAt ||
                    comment.date ||
                    comment.timestamp ||
                    null;

                  // Ce commentaire est-il en cours de modification ?
                  const isBeingEdited = editingCommentId === comment._id;

                  return (
                    <li
                      className={`ca-comment-card ${isBeingEdited ? "ca-comment-card--active" : ""}`}
                      key={comment._id || idx}
                      style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                      <div className="ca-comment-avatar-wrap">
                        <div
                          className="ca-comment-avatar"
                          style={{ background: getAvatarColor(name) }}
                        >
                          {getInitial(name)}
                        </div>
                        {idx < comments.length - 1 && (
                          <div className="ca-thread-line" />
                        )}
                      </div>

                      <div className="ca-comment-body">
                        <div className="ca-comment-meta">
                          <span className="ca-comment-name">{name}</span>
                          {date && (
                            <span className="ca-comment-date">{formatDate(date)}</span>
                          )}
                        </div>
                        <p className="ca-comment-text">{text}</p>

                        {/* ── BOUTONS MODIFIER / SUPPRIMER ──
                            Affichés UNIQUEMENT si le commentaire appartient
                            à l'utilisateur connecté (isOwner) */}
                        {isOwner(comment) && (
                          <div className="ca-comment-actions">
                            <button
                              className="ca-action-btn ca-action-btn--edit"
                              onClick={() => handleEditClick(comment)}
                              title="Edit comment"
                            >
                              ✎ Edit
                            </button>
                            <button
                              className="ca-action-btn ca-action-btn--delete"
                              onClick={() => handleDeleteClick(comment._id)}
                              title="Delete comment"
                            >
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}