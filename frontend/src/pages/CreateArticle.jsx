import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './createArticle.css';
import { ArrowLeft, Edit3, Sparkles, Send, ImagePlus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';

function CreateArticle() {
  const navigate = useNavigate();
  const location = useLocation();

  const articleToEdit = location.state?.article || null;
  const isEditMode = !!articleToEdit;

  const { token, userId, userName } = getStoredUser();

  const [formData, setFormData] = useState({
    title: articleToEdit?.title || '',
    author: articleToEdit?.author || userName || '',
    shortDescription: articleToEdit?.shortDescription || '',
    fullDescription: articleToEdit?.fullDescription || '',
    tag: articleToEdit?.tag || 'Architecture',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
    }
  }, [token, userId, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author || userName || 'Developer');
    data.append('shortDescription', formData.shortDescription);
    data.append('fullDescription', formData.fullDescription);
    data.append('tag', formData.tag);
    data.append('userId', userId);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let res;
      if (isEditMode) {
        res = await fetch(`${API_BASE}/api/article/update/${articleToEdit._id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });
      } else {
        res = await fetch(`${API_BASE}/api/article/create`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });
      }

      const result = await res.json();

      if (res.ok) {
        navigate('/blog');
      } else {
        setError(result.error || 'Failed to save article.');
      }
    } catch (err) {
      console.error('Error submitting article:', err);
      setError('Unable to reach server. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page-root">
      <Header />
      
      <main className="create-main">
        <div className="ambient-glow-center" style={{ top: '15%' }} />

        <div className="container create-container">
          
          <Link to="/blog" className="create-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Articles</span>
          </Link>

          <div className="framer-card create-card">
            
            <div className="create-header">
              <div className="section-badge">
                <span className="section-badge-dot" />
                <span>{isEditMode ? 'Edit Mode' : 'Author Mode'}</span>
              </div>
              <h1 className="create-title">
                {isEditMode ? 'Update Your Article' : 'Publish Technical Knowledge'}
              </h1>
              <p className="create-sub">
                Share your architectural patterns, debugging discoveries, and deep dives with the engineering community.
              </p>
            </div>

            {error && (
              <div className="create-error-alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form className="create-form" onSubmit={handleSubmit}>
              
              {/* Title */}
              <div className="create-field">
                <label>Article Headline</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Scaling Consistent Hashing in High-Throughput Microservices"
                  value={formData.title}
                  onChange={handleChange}
                  className="create-input"
                />
              </div>

              {/* Tag & Author Row */}
              <div className="create-row">
                <div className="create-field">
                  <label>Primary Topic / Tag</label>
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    className="create-select"
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Backend">Backend</option>
                    <option value="React">React</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div className="create-field">
                  <label>Author Display Name</label>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="Your name or handle"
                    value={formData.author}
                    onChange={handleChange}
                    className="create-input"
                  />
                </div>
              </div>

              {/* Short Summary */}
              <div className="create-field">
                <label>Summary / Overview (2-3 sentences)</label>
                <textarea
                  name="shortDescription"
                  required
                  rows={3}
                  placeholder="Briefly explain the core problem, engineering approach, and key takeaways..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="create-textarea"
                />
              </div>

              {/* Full Description / Content */}
              <div className="create-field">
                <label>Full Technical Article & Code Breakdown</label>
                <textarea
                  name="fullDescription"
                  required
                  rows={10}
                  placeholder="Write the full deep-dive here. Include context, architectural decisions, code patterns, benchmarks, and production lessons..."
                  value={formData.fullDescription}
                  onChange={handleChange}
                  className="create-textarea create-content-textarea"
                />
              </div>

              {/* Cover Image */}
              <div className="create-field">
                <label>Cover Graphic (Optional)</label>
                <div className="create-file-upload">
                  <ImagePlus size={20} color="#a855f7" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="create-file-input"
                  />
                  <span>{formData.image ? formData.image.name : 'Choose an image file from your device'}</span>
                </div>
              </div>

              {/* Submit */}
              <div className="create-actions">
                <Link to="/blog" className="btn-gradient-v2">
                  Cancel
                </Link>
                <button type="submit" className="btn-gradient-v1 create-submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="auth-spinner" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{isEditMode ? 'Update Publication' : 'Publish Article'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateArticle;
