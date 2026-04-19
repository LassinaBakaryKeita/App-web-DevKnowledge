import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './detailedInformationArticle.css';

function DetailedInformationArticle() {
    const location = useLocation();
    // On récupère l'article passé via l'état de navigation
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

    // Gestion du chemin de l'image pour le background
    const imageUrl = `https://backend-app-web-dev-knowledge.vercel.app/${article.image}`;

    return (
        <div className="detail-page">
            <Header />
            
            {/* SECTION 1: HERO (Background Image) */}
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
                            <span className="detail-date">{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: CONTENT (Full Description) */}
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