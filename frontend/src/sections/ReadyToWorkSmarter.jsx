import './ReadyToWorkSmarter.css';
import { ArrowRight, Sparkles, Code2, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

function ReadyToWorkSmarter() {
  return (
    <section className="section-wrapper ready-section">
      <div className="section-divider-line section-divider-top" />
      <div className="ready-glow-blob" />

      <div className="container ready-container">
        <div className="framer-card ready-card">
          
          {/* Badge */}
          <div className="section-badge ready-badge">
            <span className="section-badge-dot" />
            <span>Ready to Share What You've Built?</span>
          </div>

          {/* Heading */}
          <h2 className="ready-title">
            Join thousands of software engineers sharing <br className="desktop-break" />
            valuable technical knowledge every week
          </h2>

          {/* Subtitle */}
          <p className="ready-desc">
            Your production experience, architecture breakthroughs, and debugging journeys can help another developer succeed. Start reading or publish your first article today.
          </p>

          {/* Actions */}
          <div className="ready-actions">
            <Link to="/blog" className="btn-gradient-v1 ready-btn-primary">
              <span>Get Started</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/createArticle" className="btn-gradient-v2 ready-btn-secondary">
              <Code2 size={16} />
              <span>Write An Article</span>
            </Link>
          </div>

          {/* Bottom Perks */}
          <div className="ready-perks">
            <div className="ready-perk">
              <Sparkles size={14} color="#a855f7" />
              <span>100% Free & Open</span>
            </div>
            <div className="ready-perk-dot" />
            <div className="ready-perk">
              <Users size={14} color="#38bdf8" />
              <span>Engaged Peer Community</span>
            </div>
            <div className="ready-perk-dot" />
            <div className="ready-perk">
              <Rocket size={14} color="#34d399" />
              <span>Build Developer Credibility</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ReadyToWorkSmarter;
