import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryGuidance from '../components/CategoryGuidance';
import './createArticle.css';
import {
  ArrowLeft,
  Sparkles,
  Send,
  ImagePlus,
  AlertCircle,
  Loader2,
  HelpCircle,
  FileCode2,
  Heading,
  Bold,
  Italic,
  List,
  Link2,
  Code,
  Quote,
  Table,
} from 'lucide-react';
import { API_BASE, getStoredUser } from '../config/api';

const STORAGE_KEY_HIDE_GUIDE = 'devknowledge_hide_category_guide';

function CreateArticle() {
  const navigate = useNavigate();
  const location = useLocation();

  const articleToEdit = location.state?.article || null;
  const isEditMode = !!articleToEdit;

  const { token, userId, userName } = getStoredUser();

  // Normalize legacy tags if editing an older article
  const initialTag = articleToEdit?.tag
    ? articleToEdit.tag === 'Architecture'
      ? 'Architecture & Design'
      : articleToEdit.tag === 'Security'
      ? 'Cybersecurity'
      : articleToEdit.tag === 'Backend'
      ? 'Software Engineering'
      : articleToEdit.tag
    : 'Software Engineering';

  const [formData, setFormData] = useState({
    title: articleToEdit?.title || '',
    author: articleToEdit?.author || userName || '',
    shortDescription: articleToEdit?.shortDescription || '',
    fullDescription: articleToEdit?.fullDescription || '',
    tag: initialTag,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Category guidance state
  const [isGuideDismissed, setIsGuideDismissed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_HIDE_GUIDE) === 'true';
  });
  const [showCategoryGuide, setShowCategoryGuide] = useState(false);

  // Markdown cheat sheet toggle
  const [showMarkdownTips, setShowMarkdownTips] = useState(false);

  const textareaRef = useRef(null);

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

  // Category Selector interactions
  const handleCategoryInteraction = () => {
    if (!isGuideDismissed) {
      setShowCategoryGuide(true);
    }
  };

  const handleSelectCategoryFromGuide = (categoryName) => {
    setFormData((prev) => ({ ...prev, tag: categoryName }));
  };

  const handleCloseGuide = () => {
    setShowCategoryGuide(false);
  };

  const handleDismissPermanently = () => {
    localStorage.setItem(STORAGE_KEY_HIDE_GUIDE, 'true');
    setIsGuideDismissed(true);
    setShowCategoryGuide(false);
  };

  // Insert markdown snippet at cursor
  const insertMarkdownSnippet = (snippet, placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || placeholder;

    let insertion = '';
    let newCursorPos = start;

    switch (snippet) {
      case 'heading':
        insertion = `\n## ${selected || 'Section Title'}\n`;
        newCursorPos = start + insertion.length;
        break;
      case 'bold':
        insertion = `**${selected || 'bold text'}**`;
        newCursorPos = start + insertion.length;
        break;
      case 'italic':
        insertion = `*${selected || 'italic text'}*`;
        newCursorPos = start + insertion.length;
        break;
      case 'list':
        insertion = `\n- ${selected || 'First item'}\n- Second item\n`;
        newCursorPos = start + insertion.length;
        break;
      case 'link':
        insertion = `[${selected || 'Link title'}](https://example.com)`;
        newCursorPos = start + insertion.length;
        break;
      case 'code':
        insertion = `\n\`\`\`javascript\n// ${selected || 'Your code here'}\nconst example = true;\n\`\`\`\n`;
        newCursorPos = start + insertion.length;
        break;
      case 'quote':
        insertion = `\n> ${selected || 'Important engineering insight or quote.'}\n`;
        newCursorPos = start + insertion.length;
        break;
      case 'table':
        insertion = `\n| Metric | Monolith | Microservices |\n| :--- | :--- | :--- |\n| Deploy time | 45m | 5m |\n| Scalability | Vertical | Horizontal |\n`;
        newCursorPos = start + insertion.length;
        break;
      default:
        return;
    }

    const updatedText = text.substring(0, start) + insertion + text.substring(end);
    setFormData((prev) => ({ ...prev, fullDescription: updatedText }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
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
                <label htmlFor="article-title">Article Headline</label>
                <input
                  id="article-title"
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
                  <div className="create-field-label-row">
                    <label htmlFor="article-category">Primary Topic / Tag</label>
                    <button
                      type="button"
                      className="category-guide-toggle-btn"
                      onClick={() => setShowCategoryGuide((prev) => !prev)}
                      title="View all 10 categories and explanations"
                      aria-expanded={showCategoryGuide}
                    >
                      <HelpCircle size={13} />
                      <span>{showCategoryGuide ? 'Hide Guide' : 'Category Guide'}</span>
                    </button>
                  </div>

                  <select
                    id="article-category"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    onFocus={handleCategoryInteraction}
                    onClick={handleCategoryInteraction}
                    className="create-select"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Architecture & Design">Architecture & Design</option>
                    <option value="Data & Databases">Data & Databases</option>
                    <option value="Networks & Distributed Systems">Networks & Distributed Systems</option>
                    <option value="Systems & Infrastructure">Systems & Infrastructure</option>
                    <option value="Algorithms & Computer Science">Algorithms & Computer Science</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                  </select>
                </div>

                <div className="create-field">
                  <label htmlFor="article-author">Author Display Name</label>
                  <input
                    id="article-author"
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

              {/* Contextual Category Guidance Panel */}
              {showCategoryGuide && (
                <CategoryGuidance
                  selectedCategory={formData.tag}
                  onSelectCategory={handleSelectCategoryFromGuide}
                  onClose={handleCloseGuide}
                  onDismissPermanently={handleDismissPermanently}
                />
              )}

              {/* Short Summary */}
              <div className="create-field">
                <label htmlFor="article-summary">Summary / Overview (2-3 sentences)</label>
                <textarea
                  id="article-summary"
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
                <div className="create-field-label-row">
                  <label htmlFor="article-content">Full Technical Article & Code Breakdown</label>
                  <button
                    type="button"
                    className="markdown-guide-toggle-btn"
                    onClick={() => setShowMarkdownTips((prev) => !prev)}
                    title="Toggle Markdown formatting tips"
                    aria-expanded={showMarkdownTips}
                  >
                    <FileCode2 size={13} />
                    <span>{showMarkdownTips ? 'Hide Tips' : 'Markdown Guide'}</span>
                  </button>
                </div>

                {/* Markdown Guidance Banner */}
                <div className="markdown-helper-banner">
                  <div className="markdown-helper-top">
                    <div className="markdown-helper-badge">
                      <Sparkles size={13} />
                      <span>Markdown Supported</span>
                    </div>
                    <span className="markdown-optional-tag">Plain text or Markdown</span>
                  </div>

                  <p className="markdown-helper-text">
                    <strong>Make your article easier to read with Markdown!</strong> Use headings, bold text, lists,
                    links, and code blocks to structure your content and improve readability. Markdown is completely
                    optional — you can also write your article in plain text.
                  </p>

                  {/* Quick Syntax Insertion Buttons */}
                  <div className="markdown-toolbar">
                    <span className="markdown-toolbar-label">Quick format:</span>
                    <div className="markdown-toolbar-buttons">
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('heading')}
                        title="Add Heading"
                      >
                        <Heading size={12} />
                        <span>## Heading</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('bold')}
                        title="Add Bold Text"
                      >
                        <Bold size={12} />
                        <span>**bold**</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('italic')}
                        title="Add Italic Text"
                      >
                        <Italic size={12} />
                        <span>*italic*</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('code')}
                        title="Add Code Block"
                      >
                        <Code size={12} />
                        <span>```code```</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('list')}
                        title="Add List"
                      >
                        <List size={12} />
                        <span>- list</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('link')}
                        title="Add Link"
                      >
                        <Link2 size={12} />
                        <span>[link](url)</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('quote')}
                        title="Add Quote"
                      >
                        <Quote size={12} />
                        <span>&gt; quote</span>
                      </button>
                      <button
                        type="button"
                        className="markdown-syntax-btn"
                        onClick={() => insertMarkdownSnippet('table')}
                        title="Add Table"
                      >
                        <Table size={12} />
                        <span>table</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Markdown Tips Table */}
                  {showMarkdownTips && (
                    <div className="markdown-tips-drawer">
                      <div className="markdown-tips-grid">
                        <div className="markdown-tip-item">
                          <code>## Section Title</code>
                          <span>Subheadings (h2)</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>### Subsection</code>
                          <span>Sub-level headings (h3)</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>**bold text**</code>
                          <span>Emphasized key phrases</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>`inline code`</code>
                          <span>Functions, variables, CLI</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>```javascript ... ```</code>
                          <span>Multi-line code blocks</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>- bullet item</code>
                          <span>Unordered lists</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>1. numbered item</code>
                          <span>Step-by-step procedures</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>[Label](https://...)</code>
                          <span>External reference links</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>&gt; key insight</code>
                          <span>Important callout block</span>
                        </div>
                        <div className="markdown-tip-item">
                          <code>| A | B | \n | --- | --- |</code>
                          <span>Comparison tables</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  id="article-content"
                  ref={textareaRef}
                  name="fullDescription"
                  required
                  rows={12}
                  placeholder="Write the full deep-dive here. Include context, architectural decisions, code patterns, benchmarks, and production lessons... You can write in plain text or format with Markdown."
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
