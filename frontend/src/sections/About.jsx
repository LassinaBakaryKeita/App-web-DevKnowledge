import './About.css';
import { Sparkles, Layers, Users, TrendingUp, ShieldCheck, ArrowRight, Share2, BookOpen, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  const pillars = [
    {
      icon: <Layers size={22} color="#a855f7" />,
      title: 'Architectural Depth',
      desc: 'Substantive deep-dives and engineering breakdowns over superficial introductory tutorials.',
    },
    {
      icon: <Share2 size={22} color="#38bdf8" />,
      title: 'Peer Knowledge Sharing',
      desc: 'Every engineer has valuable lessons from production systems that can unblock others.',
    },
    {
      icon: <TrendingUp size={22} color="#34d399" />,
      title: 'Accelerate Engineering Growth',
      desc: 'Writing publicly refines your mental models and builds recognition within the industry.',
    },
    {
      icon: <ShieldCheck size={22} color="#f472b6" />,
      title: 'Open & Unpaywalled',
      desc: 'Accessible to all developers from juniors building foundations to staff engineers designing scale.',
    },
  ];

  return (
    <section className="section-wrapper about-section">
      <div className="section-divider-line section-divider-top" />
      <div className="ambient-glow-center" style={{ top: '20%' }} />

      <div className="container about-container">

        {/* Section Header */}
        <div className="about-header">
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Why DevKnowledge Exists</span>
          </div>
          <h2 className="about-title">
            Built on the belief that real engineering knowledge <br className="desktop-break" />
            should be shared freely and discovered easily
          </h2>
          <p className="about-subtitle">
            Most breakthroughs in software development happen during hard-fought debugging sessions and production scaling challenges. DevKnowledge gives engineers a dedicated space to document those insights for everyone.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="about-grid">
          {pillars.map((pillar, idx) => (
            <div className="framer-card about-card" key={idx}>
              <div className="about-card-icon-wrap">
                {pillar.icon}
              </div>
              <h3 className="about-card-title">{pillar.title}</h3>
              <p className="about-card-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="about-banner framer-card">
          <div className="about-banner-text">
            <div className="about-banner-headline">
              <BookOpen size={20} color="#c084fc" />
              <span>Join our growing collective of software authors and learners</span>
            </div>
            <p className="about-banner-sub">
              Whether you are working with Distributed Systems, TypeScript, Go, Rust, or DevOps, your perspective matters.
            </p>
          </div>
          <Link to="/blog" className="btn-gradient-v2 about-banner-btn">
            <span>Explore The Community</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
      <div className="section-divider-line section-divider-bottom" />
    </section>
  );
}

export default About;
