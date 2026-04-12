import './About.css';

function About() {
  const values = [
    {
      icon: '🧠',
      title: 'Deep Technical Content',
      desc: 'We prioritize substance over surface-level tutorials.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      desc: 'Built around peer feedback and knowledge exchange.'
    },
    {
      icon: '🚀',
      title: 'Career Growth',
      desc: 'Writing publicly accelerates your professional visibility.'
    },
    {
      icon: '🔓',
      title: 'Open & Inclusive',
      desc: 'Every developer — junior or staff — has a voice here.'
    },
  ];

  return (
    <section className="about">
      <div className="about-inner">

        {/* Left: Text */}
        <div className="about-content">
          <span className="about-label">✦ Our Mission</span>

          <h2 className="about-title">
            A knowledge hub built by engineers, for engineers
          </h2>

          <p className="about-body">
            DevKnowledge was created out of frustration with shallow content and paywalled resources. We believe that the best technical knowledge lives in the heads of working engineers and it deserves a place to be shared freely and discovered easily.
          </p>

          <p className="about-body">
            Whether you're deep in systems design, exploring new frameworks, or sharing hard-won debugging stories, DevKnowledge gives you a professional platform to write, get feedback, and build your reputation in the developer community.
          </p>

          <p className="about-body">
            We're a growing community of software engineers across all disciplines : backend, frontend, DevOps, ML, and beyond united by a love of learning and a commitment to sharing what we know.
          </p>

          <a href="/about" className="about-cta">
            Learn more about us →
          </a>
        </div>

        {/* Right: Value cards */}
        <div className="about-values">
          {values.map((v, i) => (
            <div className="about-value-card" key={i}>
              <span className="about-value-icon">{v.icon}</span>
              <div className="about-value-title">{v.title}</div>
              <div className="about-value-desc">{v.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;


