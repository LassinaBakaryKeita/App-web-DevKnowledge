import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './createArticle.css'; 

function CreateArticle() {
  const navigate = useNavigate();
  const location = useLocation();

  // Si un article est passé en state, on est en mode édition
  const articleToEdit = location.state?.article || null;
  const isEditMode = !!articleToEdit;

  const [formData, setFormData] = useState({
    title: articleToEdit?.title || '',
    author: articleToEdit?.author || '',
    shortDescription: articleToEdit?.shortDescription || '',
    fullDescription: articleToEdit?.fullDescription || '',
    image: null,
  });

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

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('shortDescription', formData.shortDescription);
    data.append('fullDescription', formData.fullDescription);
    data.append('userId', userId);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let res;

      if (isEditMode) {
        res = await fetch(
          `http://localhost:5000/api/article/update/${articleToEdit._id}`,
          {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: data,
          }
        );
      } else {
        res = await fetch('http://localhost:5000/api/article/create', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        });
      }

      const result = await res.json();

      if (res.ok) {
        navigate('/blog');
      } else {
        alert('Erreur : ' + (result.error || 'Une erreur est survenue'));
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert('Impossible de contacter le serveur. Vérifiez que le backend est lancé.');
    }
  };

  return (
    <>
      <Header />
      <main className="create-page">
        <div className="create-container">

          <div className="create-back-nav">
            <Link to="/blog" className="create-back-btn">← Back to Blog</Link>
          </div>

          <h1 className="create-title">
            {isEditMode ? 'Edit Article ✏️' : 'Create New Article ✨'}
          </h1>
          <p className="create-subtitle">
            {isEditMode
              ? 'Update your article below'
              : 'Share your knowledge with the community'}
          </p>

          <form className="create-form" onSubmit={handleSubmit}>

            <div className="create-field">
              <label>Article Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required={!isEditMode}
              />
              {isEditMode && (
                <small style={{ color: '#888', marginTop: '4px', display: 'block' }}>
                  Leave empty to keep the current image
                </small>
              )}
            </div>

            <div className="create-field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter article title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-field">
              <label>Author</label>
              <input
                type="text"
                name="author"
                placeholder="Your name"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-field">
              <label>Short Description</label>
              <textarea
                name="shortDescription"
                placeholder="Brief summary for the card..."
                value={formData.shortDescription}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="create-field">
              <label>Full Content</label>
              <textarea
                name="fullDescription"
                placeholder="Write your article in detail..."
                value={formData.fullDescription}
                onChange={handleChange}
                rows="8"
                required
              />
            </div>

            <button type="submit" className="create-submit">
              {isEditMode ? 'Update Article ✏️' : 'Publish Article 🚀'}
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CreateArticle;