import './LatestArticles.css';
import Article from '../components/Article';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

function LatestArticles({ articles = [], loading = false, error = null }) {
  return (
    <section className="section-wrapper latest-articles-section">
      <div className="ambient-glow-center" style={{ top: '20%' }} />

      <div className="container latest-articles-container">
        
        {/* Section Header */}
        <div className="latest-articles-top">
          <div className="latest-articles-heading">
            <div className="section-badge">
              <span className="section-badge-dot" />
              <span>Latest Community Insights</span>
            </div>
            <h2 className="latest-articles-title">Latest Articles & Guides</h2>
            <p className="latest-articles-desc">
              Discover recently published techniques, architecture patterns, and engineering breakdowns.
            </p>
          </div>

          <Link to="/blog" className="btn-gradient-v2 latest-articles-view-btn">
            <span>View All Articles</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Dynamic Articles Grid */}
        <div className="latest-articles-grid">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="framer-card latest-skeleton-card" />
            ))
          ) : error ? (
            <div className="latest-empty-state framer-card latest-error-card">
              <Layers size={36} color="#ef4444" />
              <h3>Unable to load latest articles</h3>
              <p>{error}</p>
              <Link to="/blog" className="btn-gradient-v2">
                <span>Explore Blog Directly</span>
              </Link>
            </div>
          ) : articles && articles.length > 0 ? (
            articles.map((article) => (
              <Article key={article._id || article.id} article={article} />
            ))
          ) : (
            <div className="latest-empty-state framer-card">
              <BookOpen size={36} color="#a855f7" />
              <h3>No articles published yet</h3>
              <p>Be the first contributor to share technical knowledge with the DevKnowledge community.</p>
              <Link to="/createArticle" className="btn-gradient-v1">
                <span>Write First Article</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default LatestArticles;