import './LatestArticles.css';
import Article from '../components/Article';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

function LatestArticles({ articles = [] }) {
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
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <Article key={article._id || article.id} article={article} />
            ))
          ) : (
            <div className="latest-empty-state framer-card">
              <BookOpen size={36} color="#a855f7" />
              <h3>Loading articles...</h3>
              <p>Fetching real developer publications from DevKnowledge community.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default LatestArticles;