import './HeroSection.css';
import {Link} from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* --- Left: Text Content --- */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Built for developers, by developers
          </div>

          <h1 className="hero-title">
            Where engineers <br />
            share what they <br />
            <span className="hero-title-highlight">actually know</span>
          </h1>

          <p className="hero-subtitle">
            DevKnowledge is the go-to platform for software engineers to publish deep-dive articles, explore battle-tested techniques, and grow together as a community.
          </p>

          <div className="hero-actions">
            <Link to="/blog" className="hero-btn-primary">
              Explore Articles →
            </Link>
            <a href="/register" className="hero-btn-secondary">
              ✍️ Start Writing
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">3.2k+</span>
              <span className="hero-stat-label">Articles</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">18k+</span>
              <span className="hero-stat-label">Readers</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">940+</span>
              <span className="hero-stat-label">Authors</span>
            </div>
          </div>
        </div>

        {/* --- Right: Visual --- */}
        <div className="hero-visual">
          <div className="hero-card-stack">

            {/* Floating badges */}
            <div className="hero-float-card">
              <span className="hero-float-icon">🔥</span>
              <span>Trending this week</span>
            </div>

            <div className="hero-float-card">
              <span className="hero-float-icon">💬</span>
              <span>240 new comments</span>
            </div>

            {/* Main preview card */}
            <div className="hero-main-card">
              <div className="hero-card-header">
                <div className="hero-card-avatar">A</div>
                <div className="hero-card-meta">
                  <div className="hero-card-name">Alex Rivera</div>
                  <div className="hero-card-role">Senior Backend Engineer</div>
                </div>
                <span className="hero-card-tag">TypeScript</span>
              </div>

              <div className="hero-card-title">
                Why I Switched from REST to tRPC and Never Looked Back
              </div>

              <div className="hero-card-excerpt">
                After years of writing repetitive API schemas, tRPC changed everything for me. Here's a practical walkthrough of the migration and the lessons I learned the hard way.
              </div>

              <div className="hero-card-footer">
                <div className="hero-card-reactions">
                  <span className="hero-card-reaction">❤️ 142</span>
                  <span className="hero-card-reaction">💬 38</span>
                  <span className="hero-card-reaction">🔖 57</span>
                </div>
                <span className="hero-card-read">Read →</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;