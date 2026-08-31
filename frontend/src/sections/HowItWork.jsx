import './HowItWork.css';
import { Search, PenTool, CheckCircle2, MessageSquare, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HowItWork() {
  const steps = [
    {
      num: '01',
      icon: <Search size={22} color="#38bdf8" />,
      title: 'Discover & Learn',
      desc: 'Browse architectural breakdowns, language deep dives, and production case studies written by peers.',
      tag: 'Read & Explore',
    },
    {
      num: '02',
      icon: <PenTool size={22} color="#a855f7" />,
      title: 'Draft & Publish',
      desc: 'Share your solutions with a clean editor that highlights syntax, diagrams concepts, and organizes tags.',
      tag: 'Author Content',
    },
    {
      num: '03',
      icon: <MessageSquare size={22} color="#34d399" />,
      title: 'Engage & Connect',
      desc: 'Receive meaningful feedback, engage in code discussions, and build a trusted professional footprint.',
      tag: 'Grow Network',
    },
  ];

  return (
    <section className="section-wrapper how-it-works-section">
      <div className="ambient-glow-center" style={{ top: '30%' }} />

      <div className="container how-container">
        
        {/* Section Header */}
        <div className="how-header">
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Workflow & Community Loop</span>
          </div>
          <h2 className="how-title">How DevKnowledge Works</h2>
          <p className="how-subtitle">
            From discovering actionable technical insights to publishing your own experience, the cycle empowers every engineer.
          </p>
        </div>

        {/* Process Cards */}
        <div className="how-grid">
          {steps.map((step, idx) => (
            <div className="framer-card how-card" key={idx}>
              <div className="how-card-top">
                <span className="how-card-num">{step.num}</span>
                <span className="how-card-tag">{step.tag}</span>
              </div>
              <div className="how-card-icon-box">
                {step.icon}
              </div>
              <h3 className="how-card-title">{step.title}</h3>
              <p className="how-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <div className="how-bottom-cta">
          <span>Ready to join the cycle?</span>
          <Link to="/createArticle" className="how-cta-link">
            <span>Publish your first article</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HowItWork;
