import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './detailedInformationArticle.css';

const API_BASE = 'https://backend-app-web-dev-knowledge.vercel.app';

function DetailedInformationArticle() {
    const location = useLocation();
    const { article } = location.state || {};

    if (!article) {
        return (
            <div className="detail-error">
                <Header />
                <div className="container">
                    <p>Article introuvable.</p>
                    <Link to="/blog" className="create-back-btn">← Retour au blog</Link>
                </div>
            </div>
        );
    }

    // URL Cloudinary complète si l'image commence par "http",
    // sinon on préfixe avec l'URL du backend (anciens articles)
    const imageUrl = article.image
        ? article.image.startsWith('http')
            ? article.image
            : `${API_BASE}/${article.image}`
        : '';

    return (
        <div className="detail-page">
            <Header />

            <section
                className="detail-hero"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="detail-hero-overlay" />
                <div className="detail-hero-content container">
                    <Link to="/blog" className="detail-back-link">
                        <span className="detail-back-arrow">←</span>
                        <span>Back to Blog</span>
                    </Link>
                    <div className="detail-hero-text">
                        <h1 className="detail-title">{article.title}</h1>
                        <p className="detail-short-desc">{article.shortDescription}</p>
                        <div className="detail-meta">
                            <span className="detail-author">By <strong>{article.author}</strong></span>
                            <span className="detail-meta-dot" />
                            <span className="detail-date">
                                {new Date(article.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="detail-content-section container">
                <div className="detail-article-body">
                    <div className="detail-full-description">
                        {article.fullDescription}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default DetailedInformationArticle;