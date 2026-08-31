import './Features.css';
import { Edit3, Search, MessageSquareCode, BarChart3, BookmarkCheck, Sparkles, Terminal, Code, Cpu } from 'lucide-react';

const featureList = [
  {
    icon: <Edit3 size={22} color="#a855f7" />,
    title: 'Focused Markdown & Code Editor',
    desc: 'Write seamless engineering articles with rich formatting, syntax highlighting, and clean code blocks designed for technical clarity.',
  },
  {
    icon: <Search size={22} color="#38bdf8" />,
    title: 'Precision Topic Tagging',
    desc: 'Categorize by ecosystem — from React and TypeScript to Docker, Kubernetes, Rust, and Backend architectures.',
  },
  {
    icon: <MessageSquareCode size={22} color="#34d399" />,
    title: 'Contextual Peer Feedback',
    desc: 'Exchange constructive comments, ask questions about specific architectural decisions, and learn collaboratively.',
  },
  {
    icon: <BarChart3 size={22} color="#f97316" />,
    title: 'Author Contribution Hub',
    desc: 'Manage your published work, track reactions, and build an authentic portfolio of technical knowledge.',
  },
  {
    icon: <BookmarkCheck size={22} color="#ec4899" />,
    title: 'Engagement & Bookmarks',
    desc: 'Like, bookmark, and save must-read engineering resources for your ongoing development projects.',
  },
  {
    icon: <Cpu size={22} color="#6366f1" />,
    title: 'Engineered for Performance',
    desc: 'Blazing fast load times, zero paywalls, no distracting popups — just pure developer knowledge.',
  },
];

function Features() {
  return (
    <section className="section-wrapper features-section">
      <div className="section-divider-line section-divider-top" />
      <div className="ambient-glow-center" style={{ top: '40%' }} />

      <div className="container features-container">
        
        {/* Header */}
        <div className="features-header">
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="features-title">Engineered for Technical Authors & Readers</h2>
          <p className="features-subtitle">
            Every feature is crafted to maximize clarity, foster community engagement, and make knowledge sharing effortless.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {featureList.map((f, i) => (
            <div className="framer-card feature-card" key={i}>
              <div className="feature-icon-box">
                {f.icon}
              </div>
              <h3 className="feature-name">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
      <div className="section-divider-line section-divider-bottom" />
    </section>
  );
}

export default Features;